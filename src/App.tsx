import React, { useState, useEffect, useRef } from 'react'
import { Col, Container, Image, Row } from 'react-bootstrap'
import siteLogo from './assets/images/site-logo.png'
import { Grid } from './components/grid/Grid'
import { Keyboard } from './components/keyboard/Keyboard'
import { ResultModal } from './components/modals/ResultModal'
import {
  NOT_ENOUGH_LETTERS_MESSAGE,
  WORD_NOT_FOUND_MESSAGE,
  DISCOURAGE_INAPP_BROWSER_TEXT,
} from './constants/strings'
import {
  MAX_CHALLENGES,
  REVEAL_TIME_MS,
  DISCOURAGE_INAPP_BROWSERS,
} from './constants/settings'
import {
  isWordInWordList,
  isWinningWord,
  findFirstUnusedReveal,
  unicodeLength,
} from './lib/words'
import { addStatsForCompletedGame, loadStats } from './lib/stats'
import { default as GraphemeSplitter } from 'grapheme-splitter'

import './App.css'
import { AlertContainer } from './components/alerts/AlertContainer'
import { useAlert } from './context/AlertContext'
import { isInAppBrowser } from './lib/browser'
import dogImage from './assets/images/background/dog.png'
import catSmallImage from './assets/images/background/cat-small.png'
import IconTimer from './assets/icons/timer.svg'
import GameService from './services/game.service'
import { useAuthHeader } from 'react-auth-kit'
import { useStopwatch } from 'react-timer-hook'
import { Buffer } from 'buffer'
import { useNavigate } from 'react-router-dom'

function App() {
  const authHeader = useAuthHeader()
  const navigate = useNavigate()

  const { seconds, minutes, pause, reset } = useStopwatch({ autoStart: false })

  const { showError: showErrorAlert, showSuccess: showSuccessAlert } =
    useAlert()
  const [currentGuess, setCurrentGuess] = useState('')
  const [isGameWon, setIsGameWon] = useState(false)
  const [isFinishModalOpen, setIsFinishModalOpen] = useState(false)
  const [currentRowClass, setCurrentRowClass] = useState('')
  const [isGameLost, setIsGameLost] = useState(false)
  const [isRevealing, setIsRevealing] = useState(false)
  const [solution, setSolution] = useState('')
  const [position, setPosition] = useState('0')
  const [ranking, setRanking] = useState('0')
  const [guesses, setGuesses] = useState<string[]>([])

  const startGame = () => {
    setIsFinishModalOpen(false)
    setIsGameLost(false)
    setIsGameWon(false)
    GameService.start(authHeader()).then((res) => {
      //console.log(res)

      if (!res.solution) {
        navigate('/rating')
        return
      }

      const stopwatchOffset = new Date()
      stopwatchOffset.setSeconds(stopwatchOffset.getSeconds() + res.duration)
      reset(stopwatchOffset)

      if (res.attempts && res.attempts.length === MAX_CHALLENGES) {
        setIsGameLost(true)
        /* showErrorAlert(CORRECT_WORD_MESSAGE(res.solution), {
          persist: true,
        }) */
      }

      setSolution(
        Buffer.from(res.solution, 'base64').toString('utf8').toUpperCase()
      )
      let attempts = []
      if (res.attempts) attempts = res.attempts.map((x: any) => x.guess)

      setGuesses(attempts)
      if (res.position >= 0) setPosition((res.position + 1).toString())
      if (res.rankingcount > 0) setRanking(res.rankingcount)
    })
  }

  useEffect(() => {
    startGame()
  })

  const [stats, setStats] = useState(() => loadStats())

  const [isHardMode] = useState(
    localStorage.getItem('gameMode')
      ? localStorage.getItem('gameMode') === 'hard'
      : false
  )

  useEffect(() => {
    DISCOURAGE_INAPP_BROWSERS &&
      isInAppBrowser() &&
      showErrorAlert(DISCOURAGE_INAPP_BROWSER_TEXT, {
        persist: false,
        durationMs: 7000,
      })
  }, [showErrorAlert])

  const clearCurrentRowClass = () => {
    setCurrentRowClass('')
  }

  useEffect(() => {
    if (isGameWon || isGameLost) {
      const delayMs = REVEAL_TIME_MS * solution.length
      pause()

      setTimeout(() => {
        setIsFinishModalOpen(true)
      }, delayMs)
    }
  }, [isGameWon, isGameLost, showSuccessAlert, pause, solution])

  const onChar = (value: string) => {
    if (
      unicodeLength(`${currentGuess}${value}`) <= solution.length &&
      guesses.length < MAX_CHALLENGES &&
      !isGameWon
    ) {
      setCurrentGuess(`${currentGuess}${value}`)
    }
  }

  const onDelete = () => {
    setCurrentGuess(
      new GraphemeSplitter().splitGraphemes(currentGuess).slice(0, -1).join('')
    )
  }

  const onEnter = () => {
    if (isGameWon || isGameLost) {
      return
    }
    //    console.log(solution, unicodeLength(currentGuess), solution.length)
    if (!(unicodeLength(currentGuess) === solution.length)) {
      setCurrentRowClass('jiggle')
      return showErrorAlert(NOT_ENOUGH_LETTERS_MESSAGE, {
        onClose: clearCurrentRowClass,
      })
    }

    if (!isWordInWordList(currentGuess)) {
      setCurrentRowClass('jiggle')
      return showErrorAlert(WORD_NOT_FOUND_MESSAGE, {
        onClose: clearCurrentRowClass,
      })
    }

    // enforce hard mode - all guesses must contain all previously revealed letters
    if (isHardMode) {
      const firstMissingReveal = findFirstUnusedReveal(
        currentGuess,
        guesses,
        solution
      )
      if (firstMissingReveal) {
        setCurrentRowClass('jiggle')
        return showErrorAlert(firstMissingReveal, {
          onClose: clearCurrentRowClass,
        })
      }
    }

    GameService.attempt(authHeader(), currentGuess).then((res) => {
      //      console.log(res)
    })

    setIsRevealing(true)
    // turn this back off after all
    // chars have been revealed
    setTimeout(() => {
      setIsRevealing(false)
    }, REVEAL_TIME_MS * solution.length)

    const winningWord = isWinningWord(currentGuess, solution)

    if (
      unicodeLength(currentGuess) === solution.length &&
      guesses.length < MAX_CHALLENGES &&
      !isGameWon
    ) {
      setGuesses([...guesses, currentGuess])
      setCurrentGuess('')

      if (winningWord) {
        setStats(addStatsForCompletedGame(stats, guesses.length))
        return setIsGameWon(true)
      }

      if (guesses.length === MAX_CHALLENGES - 1) {
        setStats(addStatsForCompletedGame(stats, guesses.length + 1))
        setIsGameLost(true)
        /* showErrorAlert(CORRECT_WORD_MESSAGE(solution), {
          persist: true,
          delayMs: REVEAL_TIME_MS * solution.length + 1,
        }) */
      }
    }
  }

  const boardContainer = useRef<any>()
  const [width, setWidth] = useState()
  const [height, setHeight] = useState()

  const getBoardSize = () => {
    const newWidth = Math.min(
      Math.floor(boardContainer.current.clientHeight * (5 / 6)),
      500,
      boardContainer.current.clientWidth
    )
    // @ts-ignore
    setWidth(newWidth)

    const newHeight = 6 * Math.floor(newWidth / 5)
    // @ts-ignore
    setHeight(newHeight)
  }

  useEffect(() => {
    window.addEventListener('resize', getBoardSize)
    getBoardSize()
  })

  return (
    <main className={'main main--game'}>
      <div className="main__background">
        <Row className={'g-0 flex-nowrap'}>
          <Col>
            <Image
              src={dogImage}
              className={'main__background-image main__background-image--dog'}
            />
          </Col>
          <Col xs="auto">
            <div className="main__background-spacer"></div>
          </Col>
          <Col>
            <Image
              src={catSmallImage}
              className={
                'main__background-image main__background-image--cat-small'
              }
            />
          </Col>
        </Row>
      </div>
      <div className="main__header">
        <Container fluid>
          <Row className={'align-items-end'}>
            <Col className={'d-flex flex-right pb-1'}>
              <div className="timer">
                <div className="timer__icon">
                  <Image src={IconTimer} />
                </div>
                <div className="timer__value">
                  {(minutes > 9 ? '' : '0') + minutes}:
                  {(seconds > 9 ? '' : '0') + seconds}
                </div>
              </div>
            </Col>
            <Col xs={'auto'}>
              <Image src={siteLogo} fluid className="mx-auto main__logo" />
            </Col>
            <Col className="pb-1">
              <div className="rank">
                {position} <span className="rank__delimiter"></span> {ranking}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="main__content">
        <div className="game">
          <div id="board-container" ref={boardContainer}>
            <div
              id="board"
              className="grid"
              style={{ width: width, height: height }}
            >
              <Grid
                solution={solution}
                guesses={guesses}
                currentGuess={currentGuess}
                isRevealing={isRevealing}
                currentRowClassName={currentRowClass}
              />
            </div>
          </div>
          <Keyboard
            onChar={onChar}
            onDelete={onDelete}
            onEnter={onEnter}
            solution={solution}
            guesses={guesses}
            isRevealing={isRevealing}
          />
        </div>
        <div className="game__alert">
          <AlertContainer />
        </div>
      </div>
      <ResultModal
        show={isFinishModalOpen}
        onHide={() => setIsFinishModalOpen(false)}
        minutes={minutes}
        seconds={seconds}
        solution={solution}
        isGameWon={isGameWon}
        startgame={() => {
          startGame()
        }}
      />
    </main>
    /*<div className="h-screen flex flex-col">
      <Navbar
        setIsInfoModalOpen={setIsInfoModalOpen}
        setIsStatsModalOpen={setIsStatsModalOpen}
        setIsSettingsModalOpen={setIsSettingsModalOpen}
      />
      <div className="pt-2 px-1 pb-8 md:max-w-7xl w-full mx-auto sm:px-6 lg:px-8 flex flex-col grow">
        <div className="pb-6 grow">
          <Grid
            solution={solution}
            guesses={guesses}
            currentGuess={currentGuess}
            isRevealing={isRevealing}
            currentRowClassName={currentRowClass}
          />
        </div>
        <Keyboard
          onChar={onChar}
          onDelete={onDelete}
          onEnter={onEnter}
          solution={solution}
          guesses={guesses}
          isRevealing={isRevealing}
        />
        <InfoModal
          isOpen={isInfoModalOpen}
          handleClose={() => setIsInfoModalOpen(false)}
        />
        <StatsModal
          isOpen={isStatsModalOpen}
          handleClose={() => setIsStatsModalOpen(false)}
          solution={solution}
          guesses={guesses}
          gameStats={stats}
          isGameLost={isGameLost}
          isGameWon={isGameWon}
          handleShareToClipboard={() => showSuccessAlert(GAME_COPIED_MESSAGE)}
          handleMigrateStatsButton={() => {
            setIsStatsModalOpen(false)
            setIsMigrateStatsModalOpen(true)
          }}
          isHardMode={isHardMode}
          isDarkMode={isDarkMode}
          isHighContrastMode={isHighContrastMode}
          numberOfGuessesMade={guesses.length}
        />
        <MigrateStatsModal
          isOpen={isMigrateStatsModalOpen}
          handleClose={() => setIsMigrateStatsModalOpen(false)}
        />
        <SettingsModal
          isOpen={isSettingsModalOpen}
          handleClose={() => setIsSettingsModalOpen(false)}
          isHardMode={isHardMode}
          handleHardMode={handleHardMode}
          isDarkMode={isDarkMode}
          handleDarkMode={handleDarkMode}
          isHighContrastMode={isHighContrastMode}
          handleHighContrastMode={handleHighContrastMode}
        />
        <AlertContainer />
      </div>
    </div>*/
  )
}

export default App
