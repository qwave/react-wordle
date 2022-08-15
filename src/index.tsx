import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import './assets/styles/App.scss'
import App from './App'
import Auth from './views/Auth'
import Home from './views/Home'
import Playday from './views/Playday'
import Rating from './views/Rating'
import Rules from './views/Rules'
import reportWebVitals from './reportWebVitals'
import { AlertProvider } from './context/AlertContext'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { AuthProvider, RequireAuth } from 'react-auth-kit'

ReactDOM.render(
  <React.StrictMode>
    <AlertProvider>
      <AuthProvider authType={'localstorage'} authName={'_auth'}>
        <BrowserRouter>
          <Routes>
            <Route path={'/auth'} element={<Auth />} />
            <Route path={'*'} element={<Navigate replace to="/rating" />} />
            <Route
              path={'/rating'}
              element={
                <RequireAuth loginPath={'/auth'}>
                  <Rating />
                </RequireAuth>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </AlertProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
