import { useState } from 'react'
import './App.css'
import Flip7 from './components/Flip7.jsx'

function App() {
  const [highScore, setHighScore] = useState(0);
  const handleSetHighScore = (score) => {
    if(score > highScore) {
      setHighScore(highScore);
    }
  }
  return (
    <>
      <h1>High Score: {highScore}</h1>
      <Flip7 handleSetHighScore={handleSetHighScore}/>
    </>
  )
}

export default App