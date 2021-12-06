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
  const myStorage = window.localStorage
  const [playerCards, setPlayerCards] = useState([])
  const [dealerCards, setDealerCards] = useState([])
  const [playerHand, setPlayerHand, playerHandRef] = useState(0)
  const [dealerHand, setDealerHand] = useState(0)
  const [deal, setDeal] = useState(0)
  const [cash, setCash, cashRef] = useState(parseInt(myStorage.getItem('cash')))
  const [isHitButtonDisabled, setIsHitButtonDisabled] = useState(true)
  const [isStandButtonDisabled, setIsStandButtonDisabled] = useState(true)
  const [isCoinButtonsDisabled, setIsCoinButtonsDisabled] = useState(false)
  const [isStandButtonClicked, setIsStandButtonClicked] = useState(false)
  const coins = [1, 5, 10, 25, 50, 100, 1000];

  useEffect(() => {
    myStorage.setItem('cash', JSON.stringify(cash))
  }, [cash])

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

  useEffect(() => {
    console.log('dealerHand useEffect Deal: ', deal)
    if (dealerHand <= 11 && isStandButtonClicked) {
      console.log('dealerHand is < 11')
      console.log('getting another card...')
      setTimeout(() => {
        handleStandClick()
      }, 1000);
      return
    }
    if (dealerHand > 11) {
      console.log('dealerhand: ', dealerHand)
      console.log('dearlerHand is > 11')
      console.log('activating setTimeout...')
      setTimeout(() => {
        if (dealerHand === 21) {
          console.log('dealerhand: ', dealerHand)
          console.log('dearlerHand is === 21')
          Swal.fire(`Dealer wins with ${dealerHand} points.`)
          setIsStandButtonClicked(false)
          clearOutput()
          enableCoinButtons()
        }
        if (dealerHand > 21) {
          console.log('dealerhand: ', dealerHand)
          console.log('dearlerHand > 21')
          Swal.fire(`Dealer bust with ${dealerHand} points. You win \\o/`)
          setIsStandButtonClicked(false)
          setCash(parseInt(myStorage.getItem('cash')) + deal)
          clearOutput()
          enableCoinButtons()
          return
        }
        if (dealerHand >= 17) {
          console.log('dealerhand: ', dealerHand)
          console.log('dearlerHand is => 17')
          if (dealerHand > playerHand) {
            console.log('dealerhand: ', dealerHand)
            console.log('dearlerHand is > playerHand')
            Swal.fire(`Dealer wins with ${dealerHand} points.`)
            setIsStandButtonClicked(false)
            clearOutput()
            enableCoinButtons()
            return
          }
          if (dealerHand === playerHand) {
            console.log('dealerhand: ', dealerHand)
            console.log('dearlerHand is === playerHand')
            Swal.fire(`Draw.`)
            setCash(parseInt(myStorage.getItem('cash')) + (deal / 2))
            setIsStandButtonClicked(false)
            clearOutput()
            enableCoinButtons()
            return
          }
          if (dealerHand < playerHand) {
            console.log('dealerhand: ', dealerHand)
            console.log('dearlerHand is < playerHand')
            Swal.fire(`Dealer bust with ${dealerHand} points. You win \\o/`)
            setIsStandButtonClicked(false)
            setCash(parseInt(myStorage.getItem('cash')) + deal)
            clearOutput()
            enableCoinButtons()
            return
          }
        } else {
          console.log('dealerhand: ', dealerHand)
          console.log('dearlerHand is < 17')
          handleStandClick()
        }
      }, 1000);
    }
  }, [dealerHand])

  const clearOutput = () => {
    setTimeout(() => {
      setDealerHand(0)
      setDealerCards([])
      setDeal(0)
      setPlayerHand(0)
      setPlayerCards([])
    }, 2000);
  }

  const enableCoinButtons = () => {
    setTimeout(() => {
      setIsHitButtonDisabled(true)
      setIsStandButtonDisabled(true)
      setIsCoinButtonsDisabled(false)
    }, 2000);
  }

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
    setCash(parseInt(myStorage.getItem('cash')) - cashValue);
    setDeal(deal + cashValue);
  };

  const handleClearDeal = () => {
    setDeal(0)
    setCash(parseInt(myStorage.getItem('cash')) + deal)
  }

  const handleDealClick = () => {
    document.querySelector('#deal').disabled = true
    document.querySelector('#clear').disabled = true
    setIsCoinButtonsDisabled(true)

    const dealerCard = getACard();
    const playerCard_1 = getACard();
    const playerCard_2 = getACard();

    setPlayerHand(playerHand + playerCard_1.value + playerCard_2.value);
    setPlayerCards((cards) => [...cards, playerCard_1.value]);
    setPlayerCards((cards) => [...cards, playerCard_2.value]);
    setDealerHand(dealerHand + dealerCard.value);
    setDealerCards((cards) => [...cards, dealerCard.value]);
    
    setIsHitButtonDisabled(playerHandRef.current === 21 ? true : false)
    setIsStandButtonDisabled(playerHandRef.current === 21 ? true : false)

    // double because the dealer place the same bet as the player
    const dealDouble = deal * 2
    setDeal(dealDouble)

    if (playerHandRef.current === 21) {
      clearOutput()
      enableCoinButtons()
      setTimeout(() => {
        // player get the deal cash
        setCash(parseInt(myStorage.getItem('cash')) + dealDouble)
        console.log('cash: ', cash)
        console.log('cashRef: ', cashRef)
        Swal.fire(`You got ${playerHandRef.current} \\o/ BLACKJACK!!!`)
      }, 1000);
      return
    }
  }

  const handleHitClick = () => {
    const card = getACard();
    // console.log("player card: ", card.stamp + " " + card.value);
    if (card.stamp === "A") {
      if (playerHandRef.current + card.value <= 21) {
        console.log("ACE vale 11");
        setPlayerHand(playerHand + card.value);
      } else {
        console.log("ACE vale 1");
        card.value = 1;
        setPlayerHand(playerHand + card.value);
      }
    }
    setPlayerHand(playerHand + card.value);
    setPlayerCards((cards) => [...cards, card.value]);
    if (playerHandRef.current === 21) {
      setCash(parseInt(myStorage.getItem('cash')) + deal)
      Swal.fire(`You win with ${playerHandRef.current} points - BLACKJACK!!!`);
      clearOutput()
      enableCoinButtons()
      return
    }
    if (playerHandRef.current > 21) {
      Swal.fire("You lose...");
      clearOutput()
      setIsHitButtonDisabled(true)
      setIsStandButtonDisabled(true)
      enableCoinButtons()
      return
    }
  };

  const handleStandClick = () => {
    setIsStandButtonClicked(true)
    setIsHitButtonDisabled(true)
    setIsStandButtonDisabled(true)
    const card = getACard();
    // console.log("dealer card: ", card.value);
    setDealerHand(dealerHand + card.value);
    setDealerCards((cards) => [...cards, card.value]);
  };

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
        <button disabled={isStandButtonDisabled} id='stand' onClick={handleStandClick}>STAND</button>
      </div>
      <br />
      <div>
        {coins.map(coin => <button disabled={isCoinButtonsDisabled} onClick={handleCoinClick} key={coin}>{coin}</button>)}
      </div>
    </div>
  )
};

export default App;
