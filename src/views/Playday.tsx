import { Col, Container, Button, Image, Row } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import siteLogo from '../assets/images/site-logo.png'
import DayOne from '../assets/images/days/one.svg'
import DayTwo from '../assets/images/days/two.svg'
import DayThree from '../assets/images/days/three.svg'
import DayFour from '../assets/images/days/four.svg'
import DayFive from '../assets/images/days/five.svg'
import DaySix from '../assets/images/days/six.svg'
import DaySeven from '../assets/images/days/seven.svg'
import Words from '../assets/images/background/12-words.png'
import React, { useState, useEffect } from 'react'
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
      localStorage.setItem('status', resp.status)
    })
  })

  return (
    <main className={'main main--playday'}>
      <div className="main__background">
        <Row className={'g-0 flex-nowrap'}>
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
