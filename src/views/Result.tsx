import React, { useEffect, useState } from 'react'
import { Button, Image, Modal, ModalProps } from 'react-bootstrap'
import IconSearch from '../assets/icons/search.svg'
import IconTimer from '../assets/icons/timer.svg'

function ResultModal(props: ModalProps) {
  return (
    <Modal
      {...props}
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
            <div className='timer__value'>01:33</div>
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
          <Button onClick={props.onHide}>Продолжить</Button>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default function Rules() {
  const [modalShow, setModalShow] = useState(true)

  return (
    <>
      <Button variant='primary' onClick={() => setModalShow(true)}>
        Launch modal with grid
      </Button>

      <ResultModal show={modalShow} onHide={() => setModalShow(false)} />
    </>
  )
}
