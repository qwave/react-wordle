import { Col, Container, Button, Image, Row } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import siteLogo from '../assets/images/site-logo.png'
import React from 'react'
import dogImage from '../assets/images/background/dog.png'
import catSmallImage from '../assets/images/background/cat-small.png'

export default function Welcome() {
  return (
    <main className={'main main--welcome'}>
      <div className='main__background'>
        <Row className={'g-0 flex-nowrap'}>
          <Col>
            <Image src={dogImage} className={'main__background-image main__background-image--dog'} />
          </Col>
          <Col xs='auto'>
            <div className='main__background-spacer'></div>
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
              Недавно мы вместе перезапустили наши продуктовые линейки для котят и щенков: формулы стали еще более эффективными, а коммуникация с потребителем – понятнее. Продукт быстро появился на реальных и виртуальных полках наших партнеров, а Customer Care начали получать первые отзывы от покупателей. Но впереди нас ждет еще много челленджей!<br/>
              Поэтому нам так важна энергия, ум, быстрота и эрудиция каждого сотрудника. Чтобы потренировать все эти навыки, мы предлагаем тебе сыграть в нашумевшую игру Wordle.<br/>
              Игра продлится <strong>14 дней</strong>, каждый день тебе будет доступен новый раунд.<br/><strong>Войди в ТОП-5 игроков</strong> и получи приз!
            </div>
            <div className='main__actions'>
              <LinkContainer to='/playday'>
                <Button size={'lg'}>Start</Button>
              </LinkContainer>
            </div>
          </div>
        </Container>
      </div>
    </main>
  )
}
