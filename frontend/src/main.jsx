import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'

import './index.css'
import App from './App.jsx'

import store from './store.js'

import { AlertProvider } from './context/alert/AlertContext.jsx'
import { MenuProvider } from './context/menu/MenuContext.jsx'

import HomePage from './pages/HomePage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import VerifyEmailPage from './pages/VerifyEmailPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import ForgotPasswordPage from './pages/ForgotPasswordPage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import PageNotFoundPage from './pages/PageNotFoundPage.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index path='/' element={<HomePage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/verify-email' element={<VerifyEmailPage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/forgot-password' element={<ForgotPasswordPage />} />
      <Route path='/about' element={<AboutPage />} />
      <Route path='/page-not-found' element={<PageNotFoundPage />} />
      <Route path='/*' element={<Navigate to="/page-not-found" replace />} />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <StrictMode>
      <AlertProvider>
        <MenuProvider>
          <RouterProvider router={router} />
        </MenuProvider>
      </AlertProvider>
    </StrictMode>
  </Provider>,
)
