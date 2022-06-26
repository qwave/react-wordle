import { Col, Container, Image } from 'react-bootstrap'
import siteLogo from '../assets/images/site-logo.png'

export default function Rating() {
  return (
    <main className={'main main--rating'}>
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

          </div>
        </Container>
      </div>
    </main>
  )
}
