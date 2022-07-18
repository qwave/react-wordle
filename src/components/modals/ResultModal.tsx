import React from 'react'
import { Button, Image, Modal, ModalProps } from 'react-bootstrap'
import IconSearch from '../../assets/icons/search.svg'
import IconTimer from '../../assets/icons/timer.svg'

type ResultModalOwnProps = {
  minutes: number,
  seconds: number,
  solution: string,
  fact: string,
  isGameWon: boolean,
  isDemo: boolean,
  startgame: () => void
}

type ResultModalProps = ModalProps & ResultModalOwnProps

export const ResultModal = (props: ResultModalProps) => {
  return (
    <Modal
      onHide={props.onHide}
      show={props.show}
      centered
      backdrop='static'
      dialogClassName={'result-dialog'}
    >
      <Modal.Body className='result'>
        {props.isGameWon ? <div className='result__title'>Слово угадано!</div> : <>
        <div className='result__title'>ЗАГАДАННОЕ СЛОВО</div>
        <div className='result__text'>{props.solution}</div></>}
        {props.isGameWon && <div className='result__timer'>
          <div className='result__timer-title'>Твоё время:</div>
          <div className='timer'>
            <div className='timer__icon'>
              <Image src={IconTimer} />
            </div>
            <div className='timer__value'>
              {(props.minutes > 9 ? '' : '0') + props.minutes}:
              {(props.seconds > 9 ? '' : '0') + props.seconds}
            </div>
          </div>
        </div>}
        {props.fact && props.fact.length > 0 && 
          <div className='result__fact'>
            <div className='result__fact-label'>
              <Image src={IconSearch} />
              Интересный факт
            </div>
            <div className='result__fact-text'>{props.fact}</div>
          </div>
        }
        <div className='result__actions'>
          <Button onClick={() => { props.startgame()}}>Продолжить</Button>
        </div>
      </Modal.Body>
    </Modal>
  )
}
