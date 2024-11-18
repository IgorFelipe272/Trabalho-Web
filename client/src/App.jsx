import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LoginPage from './pages/LoginPage'

//Utiliza apenas a pagina de login no momento
function App() {
  return (
    <>
      <LoginPage/>
    </>
  )
}

export default App