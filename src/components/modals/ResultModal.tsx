import React, { useEffect, useState } from 'react'
import { Button, Image, Modal, ModalProps } from 'react-bootstrap'
import IconSearch from '../../assets/icons/search.svg'
import IconTimer from '../../assets/icons/timer.svg'

type ResultModalOwnProps = {
  minutes: number,
  seconds: number,
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
        <div className='result__title'>Слово угадано!</div>
        {/*<div className='result__title'>ЗАГАДАННОЕ СЛОВО</div>
        <div className='result__text'>Кошка</div>*/}
        <div className='result__timer'>
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
        </div>
        <div className='result__fact'>
          <div className='result__fact-label'>
            <Image src={IconSearch} />
            Интересный факт
          </div>
          <div className='result__fact-text'>Наша цель в Тихоокеанском регионе APAC к 2025 накормить более 1,7 млн котят и щенков!</div>
        </div>
        <div className='result__actions'>
          <Button onClick={() => { props.startgame()}}>Продолжить</Button>
        </div>
      </Modal.Body>
    </Modal>
  )
}
