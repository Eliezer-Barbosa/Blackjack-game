import { useEffect, useState } from "react";

const App = () => {
  const deck = [
    { stamp: "A", value: 11 },
    { stamp: "J", value: 10 },
    { stamp: "Q", value: 10 },
    { stamp: "K", value: 10 },
    { stamp: "2", value: 2 },
    { stamp: "3", value: 3 },
    { stamp: "4", value: 4 },
    { stamp: "5", value: 5 },
    { stamp: "6", value: 6 },
    { stamp: "7", value: 7 },
    { stamp: "8", value: 8 },
    { stamp: "9", value: 9 },
    { stamp: "10", value: 10 },
  ];
  const [playerCards, setPlayerCards] = useState([])
  const [dealerCards, setDealerCards] = useState([])
  const [playerHand, setPlayerHand] = useState(0)
  const [dealerHand, setDealerHand] = useState(0)
  const [deal, setDeal] = useState(0)
  const [cash, setCash] = useState(1000)
  const [isHitButtonDisabled, setIsHitButtonDisabled] = useState(true)
  const [isStandButtonDisabled, setIsStandButtonDisabled] = useState(true)
  const [isCoinButtonsDisabled, setIsCoinButtonsDisabled] = useState(false)
  const coins = [1, 5, 10, 25, 50, 100, 1000];

  useEffect(() => {
    console.log('init game effect')
    initGame()
  }, [])

  useEffect(() => {
    console.log('deal has been changed')
    if (deal > 0) {
      document.querySelector('#deal').disabled = false
      document.querySelector('#clear').disabled = false
    }
  }, [deal])

  const packOfCards = () => {
    return Array(4)
      .fill([...deck])
      .reduce((a, b) => a.concat(b));
  };

  const getACard = () => {
    const card =
      packOfCards()[Math.floor(Math.random() * packOfCards().length)];
    return card;
  };

  const handleCoinClick = ({ target: { innerText } }) => {
    const cashValue = parseInt(innerText);
    if (cashValue > cash) return;
    setCash(cash - cashValue);
    setDeal(deal + cashValue);
  };

  const handleClearDeal = () => {
    setDeal(0)
    setCash(cash + deal)
  }

  const handleDealClick = () => {
    document.querySelector('#deal').disabled = true
    document.querySelector('#clear').disabled = true
    setIsHitButtonDisabled(false)
    setIsStandButtonDisabled(false)
    setIsCoinButtonsDisabled(true)
  }

  const initGame = () => {
      // buttons must be disabled, only coins should be clickable
      
      // if any coin is clicked, then the DEAL button must be able( SEE USE EFFECT)
  }

  return (
    <div>
      <h1>Cash: ${cash}</h1>
      <h1>Dealer Hand: {dealerHand}</h1>
      <h2>Dealer Cards: {dealerCards}</h2>
      <h1>Deal: {deal}</h1>
      <h1>Player Hand: {playerHand}</h1>
      <h2>Player Cards: {playerCards}</h2>
      <div>
        <button disabled={deal === 0} id='deal' onClick={handleDealClick}>DEAL</button>
        <button disabled={deal === 0} id='clear' onClick={handleClearDeal}>CLEAR DEAL</button>
        <button disabled={isHitButtonDisabled} id='hit'>HIT</button>
        <button disabled={isStandButtonDisabled} id='stand'>STAND</button>
      </div>
      <br />
      <div>
        {coins.map(coin => <button disabled={isCoinButtonsDisabled} onClick={handleCoinClick} key={coin}>{coin}</button>)}
      </div>
    </div>
  )
};

export default App;
