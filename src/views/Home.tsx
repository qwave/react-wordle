import { Col, Container, Button, Image, Row } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import siteLogo from '../assets/images/site-logo.png'

// Playday
import DayOne from '../assets/images/days/one.svg'
import Words from '../assets/images/background/12-words.png'
import IconTimer from '../assets/icons/timer.svg'
import React from 'react'
import dogImage from '../assets/images/background/dog.png'
import catSmallImage from '../assets/images/background/cat-small.png'

export default function Welcome() {
  return (
    /*    <main className={'main main--welcome'}>*/
    <main className={'main main--playday'}>
      <div className='main__background'>
        <Row className={'g-0 flex-nowrap'}>
          {/*          <Col>
            <Image src={dogImage} className={'main__background-image main__background-image--dog'} />
          </Col>
          <Col xs='auto'>
            <div className='main__background-spacer'></div>
          </Col>*/}
          <Col>
            <Image src={catSmallImage} className={'main__background-image main__background-image--cat-small'} />
          </Col>
        </Row>
      </div>
      <div className='main__header'>
        <Container fluid>
          <Col>
            <Image src={siteLogo} fluid className='mx-auto main__logo' />
          </Col>
        </Container>
      </div>
      <div className='main__content'>
        <Container fluid>
          <div className='welcome'>
            <div className='main__text'>
              Уже совсем скоро стартует совершенно новая кампания <span className='text-primary'>Start of Life</span>. Мы перезапустим продуктовые линейки для котят и щенков.<br />
              Это cложный и важный проект со множеством вызовов: новые формулы, новые POSM,
              новые коммуникационные материалы.<br />
              Для успешного запуска нам нужна энергия,
              ум,&nbsp;быстрота и эрудиция каждого сотрудника. Чтобы потренировать все эти навыки,
              мы&nbsp;предлагаем тебе сыграть
              в&nbsp;нашумевшую&nbsp;игру Wordle.
            </div>
            <div className='main__actions'>
              <LinkContainer to='/rules'>
                <Button size={'lg'}>Start</Button>
              </LinkContainer>
            </div>
          </div>
          <div className='playday'>
            <div className='playday__images'>
              <Row>
                <Col xs={7}>
                  <Image src={DayOne} className={'playday__images-day'}/>
                </Col>
                <Col xs={5}>
                  <Image src={Words} className={'playday__images-words'}/>
                </Col>
              </Row>
            </div>
            <div className='playday__actions'>
              <LinkContainer to='/rules'>
                <Button className='btn-block'>Играть!</Button>
              </LinkContainer>
            </div>
          </div>
        </Container>
      </div>
    </main>
  )
}
