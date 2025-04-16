import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from 'react-router-dom'

import './index.css'
import App from './App.jsx'

import { AlertProvider } from './context/alert/AlertContext.jsx'
import { MenuProvider } from './context/menu/MenuContext.jsx'

import HomePage from './pages/HomePage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import PageNotFoundPage from './pages/PageNotFoundPage.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index path='/' element={<HomePage />} />
      <Route path='/about' element={<AboutPage />} />
      <Route path='/page-not-found' element={<PageNotFoundPage />} />
      <Route path='/*' element={<Navigate to="/page-not-found" replace />} />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AlertProvider>
      <MenuProvider>
        <RouterProvider router={router} />
      </MenuProvider>
    </AlertProvider>
  </StrictMode>,
)
