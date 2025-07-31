import { useState } from 'react'
import './App.css'
import {generateDeck, shuffleDeck, calculateValueOdds} from './components/Deck.jsx'


function App() {
  const [total, setTotal] = useState(0)
  const [roundTotal, setRoundTotal] = useState(0);
  const [drawnCards, setDrawnCards] = useState([]);
  const [discardPile, setDiscardPile] = useState([]);
  const [deck, setDeck] = useState(generateDeck());

  function handleCardDraw() {
    if (deck.length === 0) {
      alert("No more cards in the deck!");
      setDeck(shuffleDeck(...discardPile));
      return;
    }
    const drawnCard = deck.pop();
    setDeck(deck);
    if (typeof drawnCard === "number") {
      if(drawnCards.includes(drawnCard)) {
        setDiscardPile([...discardPile, ...drawnCards, drawnCard]);
        setDrawnCards([])
        setRoundTotal(0);
        console.log(`Busted when drawn: ${drawnCard}, current drawnCards: ${drawnCards}`);
      } else {
        setRoundTotal(roundTotal + drawnCard);
        setDrawnCards([...drawnCards, drawnCard]);
        console.log(`Value card drawn: ${drawnCard}`);
      }
    } else if (typeof drawnCard == "string") {
      // Handle action cards here
      console.log(`Action card drawn: ${drawnCard}`);
    }
    console.log(deck, calculateValueOdds(deck, 12));
  }

  function handleCashIn() {
    setTotal(total + roundTotal);
    setDiscardPile([...discardPile, ...drawnCards]);
    setDrawnCards([])
    setRoundTotal(0);
  }

  return (
    <>
      <h1>Flip 7</h1>
      <div className="card">
        <button onClick={handleCardDraw}>
          Draw Card
        </button>
        <button onClick={handleCashIn}>
          Cash In
        </button>
        <p>
          Total: {total}
        </p>
        <p>
          Current Round Total: {roundTotal}
        </p>
        <p>Current Hand: {`${drawnCards}`}</p>
      </div>
    </>
  )
}

export default App