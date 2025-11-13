import { useState, useEffect } from 'react'
import {generateDeck, shuffleDeck, calculateCardOdds} from './Deck.jsx'
import {GameCard} from './Card.jsx'
import { v4 as uuidv4 } from 'uuid';

function Flip7() {
  const [total, setTotal] = useState(0)
  const [roundTotal, setRoundTotal] = useState(0);
  const [highScore, setHighScore] = useState(0);
  
  const [currentNumberHand, setCurrentNumberHand] = useState([]);
  const [numberHand, setNumberHand] = useState([]);
  
  const [currentActionHand, setCurrentActionHand] = useState([]);
  const [actionHand, setActionHand] = useState([]);
  
  const [currentBonusHand, setCurrentBonusHand] = useState([]);
  const [bonusHand, setBonusHand] = useState([]);
  
  const [discardPile, setDiscardPile] = useState([]);
  const [deck, setDeck] = useState(generateDeck());

  const [busted, setBusted] = useState(false);
  const [flip7, setFlip7] = useState(false);
  
  const [flip3, setFlip3] = useState(false);
  const [frozen, setFrozen] = useState(false);
  const [secondChance, setSecondChance] = useState(false);

  useEffect(() => {
    if(!busted && numberHand.length === 7) {
      setFlip7(true);
    }
  }, [numberHand.length]);

  useEffect(() => {
    let currentRoundTotal = 0;
    currentRoundTotal = numberHand.reduce((acc, value) => acc + value, 0);
    
    bonusHand.forEach(bonus => {
      if (bonus.startsWith('+')) {
        currentRoundTotal += Number(bonus.slice(1));
      }
    });
    
    bonusHand.forEach(bonus => {
      if (bonus.startsWith('x')) {
        currentRoundTotal *= Number(bonus.slice(1));
      }
    });

    if(flip7) {
      currentRoundTotal += 15;
    }

    setRoundTotal(currentRoundTotal);
  }, [numberHand, bonusHand, flip7]);

  function handleCardDraw() {
    const currentDeck = [...deck];
    const card = currentDeck.pop();
    const discardLength = discardPile.length;
    const drawnCard = { id: uuidv4(), offsetX: (Math.random() * 12 - 6), offsetY: (Math.random() * 12 - 6), rotation: (Math.random() * 10 - 5), zIndex: discardLength, ...card };
    const secondChancePresent = secondChance;
    setDeck(currentDeck);

    //if number card
    if(drawnCard.value !== undefined) {
      //if drawing duplicate number
      if(numberHand.includes(drawnCard.value)) {
        if(secondChancePresent) { //use up Second Chance if present
          const updatedCurrentActionHand = currentActionHand.filter(card => card.special !== "Second Chance");
          const updatedActionHand = currentActionHand.filter(card => card !== "Second Chance");
          setCurrentActionHand(updatedCurrentActionHand);
          setActionHand(updatedActionHand);
          setSecondChance(false);
        } else {
          console.log("Busted when drawn: "+drawnCard.value);
          setCurrentNumberHand([...currentNumberHand, drawnCard]);
          setRoundTotal(0);
          setBusted(true);
        }
      } else {
        setCurrentNumberHand([...currentNumberHand, drawnCard]);
        setNumberHand([...numberHand, drawnCard.value]);
        console.log(`Value card drawn: ${drawnCard.value}`);
      }
    } else if(drawnCard.special !== undefined) {
      if(!actionHand.includes(drawnCard.special)) {
        setCurrentActionHand([...currentActionHand, drawnCard]);
        setActionHand([...actionHand, drawnCard.special]);
        if(drawnCard.special === "Second Chance") {
          setSecondChance(true);
        }
      } else {
        setDiscardPile((discard) => [drawnCard, {...discard, zIndex: discard.length + 1}])
      }
      console.log(`Action card drawn: ${drawnCard.special}`);
    } else if(drawnCard.add !== undefined) {
      setCurrentBonusHand([...currentBonusHand, drawnCard]);
      setBonusHand([...bonusHand, drawnCard.add]);
      console.log(`Bonus card drawn: ${drawnCard.add}`);
    }

    if (currentDeck.length === 0) {
      const finalScore = total + roundTotal;
      if(!busted) {
        console.log(finalScore);
        handleSetHighScore(finalScore);
      }

      alert("No more cards in the deck, cashing in current hand and resetting deck! Check to see your HIGH SCORE!");
      handleResetDeck();
    }
  }

  function handleCashIn() {
    setTotal(total + roundTotal);
    handleResetHand();
  }

  function handleResetHand() {
    setDiscardPile((discard) => {
      const pile = [...currentNumberHand, ...currentActionHand, ...currentBonusHand, ...discard];
      return pile;
    });

    setCurrentNumberHand([]);
    setNumberHand([]);

    setCurrentActionHand([]);
    setActionHand([]);

    setCurrentBonusHand([]);
    setBonusHand([]);

    setBusted(false);
    setFlip7(false);
    setRoundTotal(0);
  }

  function handleResetDeck() {
    const newDeck = shuffleDeck(generateDeck());
    setDeck(newDeck);
    setDiscardPile([]);

    setCurrentNumberHand([]);
    setNumberHand([]);

    setCurrentActionHand([]);
    setActionHand([]);

    setCurrentBonusHand([]);
    setBonusHand([]);

    setBusted(false);
    setFlip7(false);
    setRoundTotal(0);
    setTotal(0);
  }

  function handleSetHighScore(score) {
    if(score > highScore) {
      setHighScore(score);
    }
  }

  const disableDrawCard = flip7 || frozen;
  const disableCashIn = busted || flip3;

  return (
    <>
      <div className="fixed top-10 right-5 w-96 max-w-[90vw] flex items-center justify-between z-50">
        <h2 className="truncate">Total: {total}</h2>
        <h2 className="truncate">Current Round Total: {roundTotal}</h2>
        <h2 className="truncate">High Score: {highScore}</h2>
      </div>

      <div className="relative top-0 left-0 w-full flex flex-col items-center space-y-6 mt-4">
        <h1 className="text-4xl font-bold">Flip 7</h1>

        <div className="flex flex-col">
          <div className="flex items-center justify-center gap-8">
            {/* Left side: card back (deck) */}
            <div className="h-[250px] w-[200px] flex items-center justify-center">
              <GameCard back={true} />
            </div>

            {/* Right side: discard pile */}
            <div className="flex flex-col items-center mb-16">
              <p className="font-semibold mb-2 text-center">Discard Pile</p>
              <div className="relative border-2 border-gray-400 rounded-lg min-w-[200px] min-h-[250px] bg-gray-50 flex items-center justify-center">
                {discardPile.length !== 0 ? (
                  <div className="relative w-[200px] h-[230px] flex items-center justify-center">
                    {discardPile.map(card => (
                      <div key={card.id} className="absolute transition-all duration-300" style={{ transform: `translate(${card.offsetX || 0}px, ${card.offsetY || 0}px) rotate(${card.rotation || 0}deg)`, zIndex: card.zIndex,}}>
                        <GameCard {...card}/>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400 italic">No Cards</p>
                )}
              </div>
            </div>
          </div>
        </div>


        <div className="flex gap-4">
          {!busted ? <button onClick={handleCardDraw} className={`px-4 py-2 rounded-lg ${disableDrawCard ? 'bg-gray-500 text-gray' : 'bg-green-500 text-white'}`} disabled={disableDrawCard}>Draw Card</button> : <button onClick={handleResetHand} className="px-4 py-2 bg-blue-500 text-white rounded-lg">Reset Hand</button>}
          <button onClick={handleCashIn} className={`px-4 py-2 rounded-lg ${disableCashIn ? 'bg-gray-500 text-gray' : 'bg-yellow-500 text-white'}`} disabled={disableCashIn}>Cash In</button>
        </div>

        <div className="text-center">
          {flip7 && <h2 className="text-green-500 font-semibold">Congrats you Flipped 7 Number Cards, you get an EXTRA 15 points!!!!</h2>}
          {busted && <h2 className="text-red-500 font-semibold">Unlucky you BUSTED!!!</h2>}
        </div>
      </div>

      <div className="relative flex flex-col items-center justify-center">

        <div className="flex flex-col items-center mb-16">
          <p className="font-semibold mb-2">Number Board</p>
          <div className="border-2 border-gray-400 rounded-lg min-w-[200px] min-h-[250px] flex items-center justify-center bg-gray-50 transition-all duration-300 px-4">
            {currentNumberHand.length !== 0 ? (
              <div className="flex flex-nowrap justify-center items-center gap-2">
                {currentNumberHand.map((card) => (
                  <GameCard key={card.id} {...card} />
                ))}
              </div>
            ) : (
              <p className="text-gray-400 italic">No Cards</p>
            )}
          </div>
        </div>

        <div className="flex justify-center gap-20">
          <div className="flex flex-col items-center">
            <p className="font-semibold mb-2">Bonus Points Board</p>
            <div className="border-2 border-gray-400 rounded-lg min-w-[200px] min-h-[250px] flex items-center justify-center bg-gray-50 transition-all duration-300 px-4">
              {currentBonusHand.length !== 0 ? (
                <div className="flex flex-nowrap justify-center items-center gap-2">
                  {currentBonusHand.map((card) => (
                    <GameCard key={card.id} {...card} />
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 italic">No Cards</p>
              )}
            </div>
          </div>

          <div className="flex flex-col items-center">
            <p className="font-semibold mb-2">Action Board</p>
            <div className="border-2 border-gray-400 rounded-lg min-w-[200px] min-h-[250px] flex items-center justify-center bg-gray-50 transition-all duration-300 px-4">
              {currentActionHand.length !== 0 ? (
                <div className="flex flex-nowrap justify-center items-center gap-2">
                  {currentActionHand.map((card) => (
                    <GameCard key={card.id} {...card} />
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 italic">No Cards</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Flip7