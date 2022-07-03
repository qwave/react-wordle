import { Button, Col, Container, Image, Row } from 'react-bootstrap'
import siteLogo from '../assets/images/site-logo.png'
import { Key } from '../components/keyboard/Key'
import { LinkContainer } from 'react-router-bootstrap'
import blImage from '../assets/images/letters/bl.png'
import akmImage from '../assets/images/letters/akm.png'
import dogImage from '../assets/images/background/dog.png'
import catSmallImage from '../assets/images/background/cat-small.png'
import React from 'react'

export default function Rating() {
  return (
    <main className={'main main--rating'}>
      <div className='main__background'>
        <Row className={'g-0 flex-nowrap'}>
          <Col>
            <Image src={akmImage} className={'main__background-image main__background-image--akm'} />
            <Image src={dogImage} className={'main__background-image main__background-image--dog'} />
          </Col>
          <Col xs='auto'>
            <div className='main__background-spacer'></div>
          </Col>
          <Col>
            <Image src={blImage} className={'main__background-image main__background-image--bl'} />
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
          <div className='rating'>
            <div className='rating__inner'>
              <div className='rating__title-wrapper'>
                <h1 className='rating__title'>Рейтинг игроков</h1>
              </div>
              <div className='rating__top'>
                <div className='rating__top-content'>
                  <div className='rating__top-title'><span>1</span>место</div>
                  <div className='rating__top-text'><span>Иванок Сергей</span> 37 слов</div>
                </div>
              </div>
              <table className='rating__table'>
                <thead>
                <th>Фамилия Имя</th>
                <th>Количество<br />
                  слов
                </th>
                <th>Время<br />мин:сек</th>
                </thead>
                <tbody>
                {[...Array(8)].map((key) => (
                  <tr>
                    <th>Сергеев Иван</th>
                    <td>35</td>
                    <td>40</td>
                  </tr>
                ))}
                </tbody>
              </table>
            </div>
            <div className='rating__actions'>
              <LinkContainer to='/game'>
                <Button className='btn-block'>Играть!</Button>
              </LinkContainer>
            </div>
          </div>
        </Container>
      </div>
    </main>
  )
}
