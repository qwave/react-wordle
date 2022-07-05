import { Col, Container, Button, Image, Row } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import siteLogo from '../assets/images/site-logo.png'

// Playday
import DayOne from '../assets/images/days/one.svg'
import DayTwo from '../assets/images/days/two.svg'
import DayThree from '../assets/images/days/three.svg'
import DayFour from '../assets/images/days/four.svg'
import DayFive from '../assets/images/days/five.svg'
import DaySix from '../assets/images/days/six.svg'
import DaySeven from '../assets/images/days/seven.svg'
import Words from '../assets/images/background/12-words.png'
import IconTimer from '../assets/icons/timer.svg'
import React, { useState, useEffect } from 'react'
import dogImage from '../assets/images/background/dog.png'
import catSmallImage from '../assets/images/background/cat-small.png'
import { useAuthHeader } from 'react-auth-kit'
import UserService from '../services/user.service'

type Status = {
  day: number
  status: number
}

export default function Welcome() {
  const authHeader = useAuthHeader()

  const images = [DayOne, DayTwo, DayThree, DayFour, DayFive, DaySix, DaySeven]

  const [status, setStatus] = useState<Status>({
    day: 0,
    status: 0,
  })

  useEffect(() => {
    UserService.getStatus(authHeader()).then((resp) => {
      setStatus(resp)
    })
  }, [setStatus])

  return (
    /*    <main className={'main main--welcome'}>*/
    <main className={'main main--playday'}>
      <div className="main__background">
        <Row className={'g-0 flex-nowrap'}>
          {/*          <Col>
            <Image src={dogImage} className={'main__background-image main__background-image--dog'} />
          </Col>
          <Col xs='auto'>
            <div className='main__background-spacer'></div>
          </Col>*/}
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
          <Col>
            <Image src={siteLogo} fluid className="mx-auto main__logo" />
          </Col>
        </Container>
      </div>
      <div className="main__content">
        <Container fluid>
          <div className="welcome">
            <div className="main__text">
              Уже совсем скоро стартует совершенно новая кампания{' '}
              <span className="text-primary">Start of Life</span>. Мы
              перезапустим продуктовые линейки для котят и щенков.
              <br />
              Это cложный и важный проект со множеством вызовов: новые формулы,
              новые POSM, новые коммуникационные материалы.
              <br />
              Для успешного запуска нам нужна энергия, ум,&nbsp;быстрота и
              эрудиция каждого сотрудника. Чтобы потренировать все эти навыки,
              мы&nbsp;предлагаем тебе сыграть в&nbsp;нашумевшую&nbsp;игру
              Wordle.
            </div>
            <div className="main__actions">
              <LinkContainer to="/rules">
                <Button size={'lg'}>Start</Button>
              </LinkContainer>
            </div>
          </div>
          <div className="playday">
            <div className="playday__images">
              <Row>
                <Col xs={7}>
                  <Image
                    src={images[status.day]}
                    className={'playday__images-day'}
                  />
                </Col>
                <Col xs={5}>
                  <Image src={Words} className={'playday__images-words'} />
                </Col>
              </Row>
            </div>
            <div className="playday__actions">
              <LinkContainer to="/rules">
                <Button className="btn-block">Играть!</Button>
              </LinkContainer>
            </div>
          </div>
        </Container>
      </div>
    </main>
  )
}
function setStatus(resp: any) {
  throw new Error('Function not implemented.')
}
