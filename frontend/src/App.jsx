import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Home from './components/Home'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="container">
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <Home/>
    </>
  )
}

export default App
