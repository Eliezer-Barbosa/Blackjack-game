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
  const [isButtonsDisabled, setIsButtonsDisabled] = useState(false)
  const [isCoinButtonsDisabled, setIsCoinButtonsDisabled] = useState(false)
  const buttons = ['DEAL', 'HIT', 'STAND']
  const coins = [1, 5, 10, 25, 50, 100, 1000];

  useEffect(() => {
    console.log('init game effect')
    initGame()
  }, [])

  useEffect(() => {
    console.log('deal has been changed')
    if (deal > 0) {
      const btn = document.querySelector('#deal')
      btn.disabled = false
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

  const initGame = () => {
      // buttons must be disabled, only coins should be clickable
      setIsButtonsDisabled(true)
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
        {buttons.map(button => <button id={button.toLowerCase()} disabled={isButtonsDisabled} key={button}>{button}</button>)}
      </div>
      <br />
      <div>
        {coins.map(coin => <button onClick={handleCoinClick} disabled={isCoinButtonsDisabled} key={coin}>{coin}</button>)}
      </div>
    </div>
  )
};

export default App;
