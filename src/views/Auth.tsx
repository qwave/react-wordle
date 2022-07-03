import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import AuthService from '../services/auth.service'
import { useState } from 'react'
import { useSignIn, useIsAuthenticated } from 'react-auth-kit'
import { Container, Button, Spinner, Image, FormGroup, Col, Row } from 'react-bootstrap'

import siteLogo from '../assets/images/site-logo.png'
import abkmlImage from '../assets/images/letters/abkml.png'
import catImage from '../assets/images/background/cat.png'
import { useNavigate, Navigate } from 'react-router-dom'

const Login = (props: any) => {
  const signIn = useSignIn()
  const navigate = useNavigate()
  const isAuthenticated = useIsAuthenticated()
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  if (isAuthenticated()) {
    return <Navigate to='/' />
  }

  const initialValues = {
    username: '',
    email: ''
  }
  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Обязательное поле'),
    email: Yup.string().email('Некорректный email').required('Обязательное поле')
  })

  const handleLogin = (formValue: { username: string; email: string }) => {
    const { username, email } = formValue
    setLoading(true)

    AuthService.login(username, email).then(
      (res) => {
        if (signIn({
          token: res.token,
          expiresIn: 10080,
          tokenType: 'Bearer',
          authState: res.user
        })) {
          navigate('/')
        }
      },
      error => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()

        setLoading(false)
        setMessage(resMessage)
      }
    )
  }

  return (
    <main className={'main main--login'}>
      <div className='main__background'>
        <Row className={'g-0 flex-nowrap'}>
          <Col>
            <Image src={abkmlImage} className={'main__background-image main__background-image--abkml'} />
          </Col>
          <Col xs='auto'>
            <div className='main__background-spacer'></div>
          </Col>
          <Col>
            <Image src={catImage} className={'main__background-image main__background-image--cat'} />
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
          <div className='login'>
            <h1 className='main__title'>Регистрация</h1>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleLogin}
            >
              <Form>
                <FormGroup className='form-group'>
                  <Field name='username' type='text' className='form-control' placeholder={'Имя'} />
                  <ErrorMessage
                    name='username'
                    component='div'
                    className='invalid-feedback d-block'
                  />
                </FormGroup>
                <FormGroup className='form-group'>
                  <Field name='email' type='text' className='form-control' placeholder={'E-mail'} />
                  <ErrorMessage
                    name='email'
                    component='div'
                    className='invalid-feedback d-block'
                  />
                </FormGroup>
                <Button type='submit' disabled={loading} className='btn-block'>
                  {loading ? (
                    <Spinner animation='grow' size='sm' />
                  ) : (
                    <span>Вход</span>
                  )}
                </Button>
                {message && (
                  <div className='form-group'>
                    <div className='alert alert-danger' role='alert'>
                      {message}
                    </div>
                  </div>
                )}
              </Form>
            </Formik>
          </div>
        </Container>
      </div>
    </main>
  )
}

export default Login
