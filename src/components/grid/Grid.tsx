import { MAX_CHALLENGES } from '../../constants/settings'
import { CompletedRow } from './CompletedRow'
import { CurrentRow } from './CurrentRow'
import { EmptyRow } from './EmptyRow'
import { useEffect, useRef, useState } from 'react'

type Props = {
  guesses: string[]
  currentGuess: string
  isRevealing?: boolean
}


export const Grid = ({ guesses, currentGuess, isRevealing }: Props) => {
  const empties =
    guesses.length < MAX_CHALLENGES - 1
      ? Array.from(Array(MAX_CHALLENGES - 1 - guesses.length))
      : []

  const boardContainer = useRef<any>();
  const [width, setWidth] = useState();
  const [height, setHeight] = useState();

  const getBoardSize = () => {
    const newWidth = Math.min(Math.floor(boardContainer.current.clientHeight * (5 / 6)), 900);
    // @ts-ignore
    setWidth(newWidth);

    const newHeight = 6 * Math.floor(newWidth / 5);
    // @ts-ignore
    setHeight(newHeight);
  };

  useEffect(() => {
    getBoardSize();
  });

  useEffect(() => {
    window.addEventListener("resize", getBoardSize);
  }, []);

  return (
    <div id='board-container' ref={boardContainer}>
      <div id='board' className='grid' style={{width: width, height: height }}>
        {guesses.map((guess, i) => (
          <CompletedRow
            key={i}
            guess={guess}
            isRevealing={isRevealing && guesses.length - 1 === i}
          />
        ))}
        {guesses.length < MAX_CHALLENGES && <CurrentRow guess={currentGuess} />}
        {empties.map((_, i) => (
          <EmptyRow key={i} />
        ))}
      </div>
    </div>
  )
}
