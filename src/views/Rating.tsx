import { Button, Col, Container, Image, Row } from 'react-bootstrap'
import siteLogo from '../assets/images/site-logo.png'
import { Key } from '../components/keyboard/Key'
import { LinkContainer } from 'react-router-bootstrap'
import blImage from '../assets/images/letters/bl.png'
import akmImage from '../assets/images/letters/akm.png'
import dogImage from '../assets/images/background/dog.png'
import catSmallImage from '../assets/images/background/cat-small.png'
import { useAuthHeader } from 'react-auth-kit'
import GameService from '../services/game.service'
import React, { useState, useEffect, useRef } from 'react'

export default function Rating() {
  const authHeader = useAuthHeader()

  const [users, setUsers] = useState<any[]>([])

  useEffect(() => {
     GameService.rating(authHeader()).then((res) => {
      console.log(res)
      setUsers(res);
    })
  }, [])

  const isOwnRating = (users: any[], index: number) => {
    return users.length > index + 1 && users[index + 1].position;
  }

  const formatTimeFromSeconds = (time: number) => {
    let min = Math.floor(time / 60)
    let sec = time % 60
    return (min > 9 ? '' : '0') + min + ':' + (sec > 9 ? '' : '0') + sec
  }

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
                  <div className='rating__top-title'><span className={isOwnRating(users,0) ? 'rating__own' : ''}>1</span>место</div>
                  <div className='rating__top-text'><span>{users.length > 0 ? users[0].name: 'Mr. Nobody :)'}</span> {users.length > 0 ? users[0].wordcount: '0'} слов</div>
                </div>
              </div>
              <table className='rating__table'>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Фамилия Имя</th>
                    <th>Количество<br />слов</th>
                    <th>Время<br />мин:сек</th>
                  </tr>
                </thead>
                <tbody>
                {[...Array(9)].map((val,index) => (
                  <tr key={index}>
                    {isOwnRating(users,index) ? <td className='rating__own'>{users[index + 1].position + 1}</td> : <td>{index + 2}</td>}
                    <td>{users.length > index + 1 ? users[index + 1].name : '-'}</td>
                    <td>{users.length > index + 1 ? users[index + 1].wordcount : '-'}</td>
                    <td>{users.length > index + 1 ? formatTimeFromSeconds(users[index + 1].time) : ''}</td>
                  </tr>
                ))}
                </tbody>
              </table>
            </div>
            <div className='rating__actions'>
              <LinkContainer to='/playday'>
                <Button className='btn-block'>Играть!</Button>
              </LinkContainer>
            </div>
          </div>
        </Container>
      </div>
    </main>
  )
}
