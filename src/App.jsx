import { useState } from 'react'
import './App.css'
import {generateDeck, shuffleDeck, calculateCardOdds} from './components/Deck.jsx'
import {GameCard} from './components/Card.jsx'
import { v4 as uuidv4 } from 'uuid';



function App() {
  const [total, setTotal] = useState(0)
  const [roundTotal, setRoundTotal] = useState(0);
  
  const [currentNumberHand, setCurrentNumberHand] = useState([]);
  const [numberHand, setNumberHand] = useState([]);
  
  const [currentActionHand, setCurrentActionHand] = useState([]);
  const [actionHand, setActionHand] = useState([]);
  
  const [currentAdditionalHand, setCurrentAdditionalHand] = useState([]);
  const [additionalHand, setAdditionalHand] = useState([]);
  
  const [discardPile, setDiscardPile] = useState([]);
  const [deck, setDeck] = useState(generateDeck());

  const [busted, setBusted] = useState(false);
  const [flip7, setFlip7] = useState(false);

  function handleCardDraw() {

    const currentDeck = [...deck];
    if (currentDeck.length === 0) {
      alert("No more cards in the deck!");
      setDeck(shuffleDeck(...discardPile));
      return;
    }

    const card = currentDeck.pop();
    const drawnCard = {id: uuidv4(), ...card};
    console.log(drawnCard);
    setDeck(currentDeck);

    if(drawnCard.value !== undefined) {
      if(numberHand.includes(drawnCard.value)) {
        console.log("Busted when drawn: "+drawnCard.value);
        setCurrentNumberHand([...currentNumberHand, drawnCard]);
        setRoundTotal(0);
        setBusted(true);
      } else {
        setRoundTotal(roundTotal + drawnCard.value);
        setCurrentNumberHand([...currentNumberHand, drawnCard]);
        setNumberHand([...numberHand, drawnCard.value]);
        console.log(`Value card drawn: ${drawnCard.value}`);
        if(numberHand.length === 7) {
          handleAdditionalOperation("+15");
          setFlip7(true);
        }
      }
    } else if(drawnCard.special !== undefined) {
      // Handle action cards here
      if(actionHand.includes(drawnCard.special)) {
      
      }
      setCurrentActionHand([...currentActionHand, drawnCard]);
      setActionHand([...actionHand, drawnCard.special]);
      console.log(`Action card drawn: ${drawnCard.special}`);
    } else if(drawnCard.add !== undefined) {
      setCurrentAdditionalHand([...currentAdditionalHand, drawnCard]);
      setAdditionalHand([...additionalHand, drawnCard.add]);
      handleAdditionalOperation(drawnCard.add)
      console.log(`Additional card drawn: ${drawnCard.add}`);
    }
  }

  function handleAdditionalOperation(operation) {
    const value = parseFloat(operation.slice(1));
    if (operation.startsWith("+")) {
      setRoundTotal(roundTotal + value);
    } else if (operation.startsWith("x")) {
      setRoundTotal(roundTotal * value);
    }
  }


  function handleCashIn() {
    setTotal(total + roundTotal);
    setDiscardPile([...discardPile, ...currentNumberHand, ...currentActionHand, ...currentAdditionalHand]);
    
    setCurrentNumberHand([]);
    setNumberHand([]);

    setCurrentActionHand([]);
    setActionHand([]);

    setCurrentAdditionalHand([]);
    setAdditionalHand([]);

    setRoundTotal(0);
  }

  function handleResetHand() {
    setDiscardPile([...discardPile, ...currentNumberHand, ...currentActionHand, ...currentAdditionalHand]);

    setCurrentNumberHand([]);
    setNumberHand([]);

    setCurrentActionHand([]);
    setActionHand([]);

    setCurrentAdditionalHand([]);
    setAdditionalHand([]);

    setBusted(false);
    setFlip7(false);
  }

  return (
    <>
      <h1>Flip 7</h1>
      <div className="h-64 flex items-center justify-center">
        <GameCard back={true}/>
      </div>
      <div>
        {flip7 && <h2>Congrats you flipped 7 number cards!!!!</h2>}
        {busted && (
          <>
            <h2>Unlucky you BUSTED!!!</h2>
            <button onClick={handleResetHand}>Reset Hand</button>
          </>
        )}
        {!busted && <button onClick={handleCardDraw}>Draw Card</button>}
        {(currentNumberHand.length !== 0 || currentActionHand.length !== 0 || currentAdditionalHand.length !== 0) && !busted && <button onClick={handleCashIn}>Cash In</button>}
        <p>Total: {total}</p>
        <p>Current Round Total: {roundTotal}</p>
        <p>Current Hand:</p>
        {currentNumberHand.length !== 0 && (
          <div className="h-64 gap-2 flex items-center justify-center">
            {currentNumberHand.map((card) => {
              return <GameCard key={card.id} {...card} />
            })}
          </div>
        )}

        {(currentActionHand.length !== 0 || currentAdditionalHand.length !== 0) && (
          <div className="h-64 gap-2 flex items-center">
            {currentActionHand.map((card) => {
              return <GameCard key={card.id} {...card} />
            })}
            {currentAdditionalHand.map((card) => {
              return <GameCard key={card.id} {...card} />
            })}
          </div>
        )}
      </div>
    </>
  )
}

export default App