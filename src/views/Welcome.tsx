import { Col, Container, Button, Image } from 'react-bootstrap'
import siteLogo from '../assets/images/site-logo.png'

export default function Welcome() {
  return (
    <main className={'main main--welcome'}>
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
              Уже совсем скоро стартует совершенно новая кампания <span className='text-primary'>Start of Life</span>. Мы перезапустим продуктовые линейки для котят и щенков.<br/>
              Это cложный и важный проект со множеством вызовов: новые формулы, новые POSM,
              новые коммуникационные материалы.<br/>
              Для успешного запуска нам нужна энергия,
              ум,&nbsp;быстрота и эрудиция каждого сотрудника. Чтобы потренировать все эти навыки,
              мы&nbsp;предлагаем тебе сыграть
              в&nbsp;нашумевшую&nbsp;игру Wordle.
            </div>
            <div className='main__actions'>
              <Button size={'lg'}>Start</Button>
            </div>
          </div>
        </Container>
      </div>
    </main>
  )
}
