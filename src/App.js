import { useEffect } from "react";
import useState from "react-usestateref";
import Swal from 'sweetalert2'

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
  const [playerHand, setPlayerHand, playerHandRef] = useState(0)
  const [dealerHand, setDealerHand] = useState(0)
  const [deal, setDeal] = useState(0)
  const [cash, setCash, cashRef] = useState(1000)
  const [isHitButtonDisabled, setIsHitButtonDisabled] = useState(true)
  const [isStandButtonDisabled, setIsStandButtonDisabled] = useState(true)
  const [isCoinButtonsDisabled, setIsCoinButtonsDisabled] = useState(false)
  const coins = [1, 5, 10, 25, 50, 100, 1000];

  useEffect(() => {
    console.log('deal has been changed')
    if (deal > 0) {
      document.querySelector('#deal').disabled = false
      document.querySelector('#clear').disabled = false
    }
  }, [deal])

  useEffect(() => {
    if (playerCards.length > 0) {
      document.querySelector('#clear').disabled = true
      document.querySelector('#deal').disabled = true
    }
  }, [playerCards])

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

    const dealerCard = getACard();
    const playerCard_1 = getACard();
    const playerCard_2 = getACard();

    // setPlayerHand(playerHand + 21)
    setPlayerHand(playerHand + playerCard_1.value + playerCard_2.value);
    setPlayerCards((cards) => [...cards, playerCard_1.value]);
    setPlayerCards((cards) => [...cards, playerCard_2.value]);
    setDealerHand(dealerHand + dealerCard.value);
    setDealerCards((cards) => [...cards, dealerCard.value]);

    // double because the dealer place the same bet as the player
    const dealDouble = deal * 2
    setDeal(dealDouble)

    if (playerHandRef.current === 21) {
      // player get the deal cash
      setCash(cash + dealDouble)
      console.log('cash: ', cash)
      console.log('cashRef: ', cashRef)
      Swal.fire(`You got ${playerHandRef.current} \\o/ BLACKJACK!!!`)
      setTimeout(() => {
        setDealerHand(0)
        setDealerCards([])
        setDeal(0)
        setPlayerHand(0)
        setPlayerCards([])
        setIsHitButtonDisabled(true)
        setIsStandButtonDisabled(true)
        setIsCoinButtonsDisabled(false)
      }, 3000);
      return
    }
  }

  const handleHitClick = () => {
    console.log('HIT!!!')
  }

  return (
    <div>
      <h1>Cash: ${cash}</h1>
      <h1>Dealer Hand: {dealerHand}</h1>
      <h2>Dealer Cards: {dealerCards.map(card => <span style={{padding: 5}}>{card}</span>)}</h2>
      <h1>Deal: {deal}</h1>
      <h1>Player Hand: {playerHandRef.current}</h1>
      <h2>Player Cards: {playerCards.map(card => <span style={{padding: 5}}>{card}</span>)}</h2>
      <div>
        <button disabled={deal === 0} id='deal' onClick={handleDealClick}>DEAL</button>
        <button disabled={deal === 0} id='clear' onClick={handleClearDeal}>CLEAR DEAL</button>
        <button disabled={isHitButtonDisabled} id='hit' onClick={handleHitClick}>HIT</button>
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
