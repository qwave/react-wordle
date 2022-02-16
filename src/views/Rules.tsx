import { Button, Col, Container, Image, Row } from 'react-bootstrap'
import siteLogo from '../assets/images/site-logo.png'
import numberOne from '../assets/images/numbers/number-1.svg'
import numberTwo from '../assets/images/numbers/number-2.svg'
import numberThree from '../assets/images/numbers/number-3.svg'
import numberFour from '../assets/images/numbers/number-4.svg'
import { Cell } from '../components/grid/Cell'

export default function Rules() {
  return (
    <main className={'main main--rules'}>
      <div className='main__header'>
        <Container fluid>
          <Col>
            <Image src={siteLogo} fluid className='mx-auto' />
          </Col>
        </Container>
      </div>
      <div className='main__content'>
        <Container fluid>
          <div className='rules'>
            <h1 className='main__title'>ПРАВИЛА ИГРЫ</h1>
            <div className='rules__section-wrapper'>
              <div className='rules__section'>
                <div className='rules__text'>Угадайте загаданное слово с шести попыток.</div>
                <div className='rules__text'>После каждой попытки цвет букв будет меняться, чтобы показать, какие буквы есть
                  в загаданном слове! Например, мы пытаемся отгадать слово <strong className='text-primary'>КОШКА</strong>
                </div>
              </div>
              <div className='rules__section'>
                <div className='rules__text'>Перым мы ввели слово <strong className='text-primary'>АРБУЗ</strong>.<br />
                  Буква <strong className='text-primary'>А</strong> есть в загаданном слове, но стоит в другом месте.
                </div>
                <div className='rules__sample'>
                  <div className='grid__row'>
                    <Cell value='А' status='present' />
                    <Cell value='Р' />
                    <Cell value='Б' />
                    <Cell value='У' />
                    <Cell value='З' />
                  </div>
                </div>
              </div>
              <div className='rules__section'>
                <div className='rules__text'>Затем ввели слово <strong className='text-primary'>ПАЛКА</strong>.<br />
                  Буква <strong className='text-primary'>К</strong> и <strong className='text-primary'>А</strong> есть в загаданном слове и стоят на правильном месте.
                </div>
                <div className='rules__sample'>
                  <div className='grid__row'>
                    <Cell value='П' />
                    <Cell value='А' />
                    <Cell value='Л' />
                    <Cell value='К' status='correct' />
                    <Cell value='А' status='correct' />
                  </div>
                </div>
                <div className='rules__text'>Обратите внимание, что если в введенном слове две одинаковых буквы,
                  а в загаданном слове только одна такая буква, то выделяется только одна буква.
                </div>
              </div>
              <div className='rules__section'>
                <div className='rules__text'>Если слово угадано правильно, то все буквы будут выделены!</div>
                <div className='rules__sample'>
                  <div className='grid__row'>
                    <Cell value='К' status='correct' />
                    <Cell value='О' status='correct' />
                    <Cell value='Ш' status='correct' />
                    <Cell value='К' status='correct' />
                    <Cell value='А' status='correct' />
                  </div>
                </div>
              </div>
              <div className='rules__section'>
                <div className='rules__text'>Если буквы нет в загаданном слове, то она выделяется серым.<br />
                  Также важно знать, что в загаданном слове могут быть одинаковые буквы!
                </div>
                <div className='rules__sample'>
                  <div className='grid__row'>
                    <Cell value='Р' status='absent' />
                    <Cell value='Е' />
                    <Cell value='Б' />
                    <Cell value='У' />
                    <Cell value='С' />
                  </div>
                </div>
              </div>
            </div>
            <div className='rules__steps'>
              <Row>
                <Col md={6}>
                  <div className='rules__steps-item'>
                    <div className='rules__steps-number'>
                      <Image src={numberOne} />
                    </div>
                    <div className='rules__steps-text'>Среди всех сотрудников мы формируем рейтинг. На рейтинг влияют скорость ответа, количество попыток и количество слов, которые ты угадал за всю неделю.</div>
                  </div>
                </Col>
                <Col md={6}>
                  <div className='rules__steps-item'>
                    <div className='rules__steps-number'>
                      <Image src={numberTwo} />
                    </div>
                    <div className='rules__steps-text'>Каждый день тебе будет приходить напоминание о старте нового раунда.</div>
                  </div>
                </Col>
                <Col md={6}>
                  <div className='rules__steps-item'>
                    <div className='rules__steps-number'>
                      <Image src={numberThree} />
                    </div>
                    <div className='rules__steps-text'>Слова у разных сотрудников — разные. За читерство будем дисквалифицировать.</div>
                  </div>
                </Col>
                <Col md={6}>
                  <div className='rules__steps-item'>
                    <div className='rules__steps-number'>
                      <Image src={numberFour} />
                    </div>
                    <div className='rules__steps-text'>Х победителей среди сотрудников Royal Canin получат классные призы.</div>
                  </div>
                </Col>
              </Row>
            </div>
            <div className='rules__finish'>Каждый день загадывается новое слово!</div>
            <div className='rules__actions'>
              <Button className='btn-block'>Играть!</Button>
            </div>
          </div>
        </Container>
      </div>
    </main>
  )
}
