import { useState } from 'react'
import './App.css'
import Flip7 from './components/Flip7.jsx'

function App() {
  const [highScore, setHighScore] = useState(0);
  const handleSetHighScore = (score) => {
    if(score > highScore) {
      setHighScore(score);
    }
  }
  return (
    <>
      <h2 className='fixed top-5 left-200 w-full flex flex-col items-center space-y-6 mt-4'>High Score: {highScore}</h2>
      <Flip7 handleSetHighScore={handleSetHighScore}/>
    </>
  )
}

export default App