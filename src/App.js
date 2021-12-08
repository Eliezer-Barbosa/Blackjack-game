import { useEffect } from "react";
import useState from "react-usestateref";
import Swal from 'sweetalert2'

import clubsOf2 from './PNG-cards-1.3/2_of_clubs.png'
import diamondsOf2 from './PNG-cards-1.3/2_of_diamonds.png'
import heartsOf2 from './PNG-cards-1.3/2_of_hearts.png'
import spadesOf2 from './PNG-cards-1.3/2_of_spades.png'
import clubsOf3 from './PNG-cards-1.3/3_of_clubs.png'
import diamondsOf3 from './PNG-cards-1.3/3_of_diamonds.png'
import heartsOf3 from './PNG-cards-1.3/3_of_hearts.png'
import spadesOf3 from './PNG-cards-1.3/3_of_spades.png'
import clubsOf4 from './PNG-cards-1.3/4_of_clubs.png'
import diamondsOf4 from './PNG-cards-1.3/4_of_diamonds.png'
import heartsOf4 from './PNG-cards-1.3/4_of_hearts.png'
import spadesOf4 from './PNG-cards-1.3/4_of_spades.png'
import clubsOf5 from './PNG-cards-1.3/5_of_clubs.png'
import diamondsOf5 from './PNG-cards-1.3/5_of_diamonds.png'
import heartsOf5 from './PNG-cards-1.3/5_of_hearts.png'
import spadesOf5 from './PNG-cards-1.3/5_of_spades.png'
import clubsOf6 from './PNG-cards-1.3/6_of_clubs.png'
import diamondsOf6 from './PNG-cards-1.3/6_of_diamonds.png'
import heartsOf6 from './PNG-cards-1.3/6_of_hearts.png'
import spadesOf6 from './PNG-cards-1.3/6_of_spades.png'
import clubsOf7 from './PNG-cards-1.3/7_of_clubs.png'
import diamondsOf7 from './PNG-cards-1.3/7_of_diamonds.png'
import heartsOf7 from './PNG-cards-1.3/7_of_hearts.png'
import spadesOf7 from './PNG-cards-1.3/7_of_spades.png'
import clubsOf8 from './PNG-cards-1.3/8_of_clubs.png'
import diamondsOf8 from './PNG-cards-1.3/8_of_diamonds.png'
import heartsOf8 from './PNG-cards-1.3/8_of_hearts.png'
import spadesOf8 from './PNG-cards-1.3/8_of_spades.png'
import clubsOf9 from './PNG-cards-1.3/9_of_clubs.png'
import diamondsOf9 from './PNG-cards-1.3/9_of_diamonds.png'
import heartsOf9 from './PNG-cards-1.3/9_of_hearts.png'
import spadesOf9 from './PNG-cards-1.3/9_of_spades.png'
import clubsOf10 from './PNG-cards-1.3/10_of_clubs.png'
import diamondsOf10 from './PNG-cards-1.3/10_of_diamonds.png'
import heartsOf10 from './PNG-cards-1.3/10_of_hearts.png'
import spadesOf10 from './PNG-cards-1.3/10_of_spades.png'
import clubsOfAce from './PNG-cards-1.3/ace_of_clubs.png'
import diamondsOfAce from './PNG-cards-1.3/ace_of_diamonds.png'
import heartsOfAce from './PNG-cards-1.3/ace_of_hearts.png'
import spadesOfAce from './PNG-cards-1.3/ace_of_spades2.png'
import clubsOfJack from './PNG-cards-1.3/jack_of_clubs.png'
import diamondsOfJack from './PNG-cards-1.3/jack_of_diamonds.png'
import heartsOfJack from './PNG-cards-1.3/jack_of_hearts.png'
import spadesOfJack from './PNG-cards-1.3/jack_of_spades.png'
import clubsOfKing from './PNG-cards-1.3/king_of_clubs.png'
import diamondsOfKing from './PNG-cards-1.3/king_of_diamonds.png'
import heartsOfKing from './PNG-cards-1.3/king_of_hearts.png'
import spadesOfKing from './PNG-cards-1.3/king_of_spades.png'
import clubsOfQueen from './PNG-cards-1.3/queen_of_clubs.png'
import diamondsOfQueen from './PNG-cards-1.3/queen_of_diamonds.png'
import heartsOfQueen from './PNG-cards-1.3/queen_of_hearts.png'
import spadesOfQueen from './PNG-cards-1.3/queen_of_spades.png'

const App = () => {
  const spadesSuit = [
    { suit: "A", cardImage: spadesOfAce,  value: 11 },
    { suit: "J", cardImage: spadesOfJack,  value: 10 },
    { suit: "Q", cardImage: spadesOfQueen,  value: 10 },
    { suit: "K", cardImage: spadesOfKing,  value: 10 },
    { suit: "2", cardImage: spadesOf2,  value: 2 },
    { suit: "3", cardImage: spadesOf3,  value: 3 },
    { suit: "4", cardImage: spadesOf4,  value: 4 },
    { suit: "5", cardImage: spadesOf5,  value: 5 },
    { suit: "6", cardImage: spadesOf6,  value: 6 },
    { suit: "7", cardImage: spadesOf7,  value: 7 },
    { suit: "8", cardImage: spadesOf8,  value: 8 },
    { suit: "9", cardImage: spadesOf9,  value: 9 },
    { suit: "10", cardImage: spadesOf10,  value: 10 },
  ]
  const heartsSuit = [
    { suit: "A", cardImage: heartsOfAce,  value: 11 },
    { suit: "J", cardImage: heartsOfJack,  value: 10 },
    { suit: "Q", cardImage: heartsOfQueen,  value: 10 },
    { suit: "K", cardImage: heartsOfKing,  value: 10 },
    { suit: "2", cardImage: heartsOf2,  value: 2 },
    { suit: "3", cardImage: heartsOf3,  value: 3 },
    { suit: "4", cardImage: heartsOf4,  value: 4 },
    { suit: "5", cardImage: heartsOf5,  value: 5 },
    { suit: "6", cardImage: heartsOf6,  value: 6 },
    { suit: "7", cardImage: heartsOf7,  value: 7 },
    { suit: "8", cardImage: heartsOf8,  value: 8 },
    { suit: "9", cardImage: heartsOf9,  value: 9 },
    { suit: "10", cardImage: heartsOf10,  value: 10 },
  ]
  const diamondsSuit = [
    { suit: "A", cardImage: diamondsOfAce,  value: 11 },
    { suit: "J", cardImage: diamondsOfJack,  value: 10 },
    { suit: "Q", cardImage: diamondsOfQueen,  value: 10 },
    { suit: "K", cardImage: diamondsOfKing,  value: 10 },
    { suit: "2", cardImage: diamondsOf2,  value: 2 },
    { suit: "3", cardImage: diamondsOf3,  value: 3 },
    { suit: "4", cardImage: diamondsOf4,  value: 4 },
    { suit: "5", cardImage: diamondsOf5,  value: 5 },
    { suit: "6", cardImage: diamondsOf6,  value: 6 },
    { suit: "7", cardImage: diamondsOf7,  value: 7 },
    { suit: "8", cardImage: diamondsOf8,  value: 8 },
    { suit: "9", cardImage: diamondsOf9,  value: 9 },
    { suit: "10", cardImage: diamondsOf10,  value: 10 },
  ]
  const clubsSuit = [
    { suit: "A", cardImage: clubsOfAce,  value: 11 },
    { suit: "J", cardImage: clubsOfJack,  value: 10 },
    { suit: "Q", cardImage: clubsOfQueen,  value: 10 },
    { suit: "K", cardImage: clubsOfKing,  value: 10 },
    { suit: "2", cardImage: clubsOf2,  value: 2 },
    { suit: "3", cardImage: clubsOf3,  value: 3 },
    { suit: "4", cardImage: clubsOf4,  value: 4 },
    { suit: "5", cardImage: clubsOf5,  value: 5 },
    { suit: "6", cardImage: clubsOf6,  value: 6 },
    { suit: "7", cardImage: clubsOf7,  value: 7 },
    { suit: "8", cardImage: clubsOf8,  value: 8 },
    { suit: "9", cardImage: clubsOf9,  value: 9 },
    { suit: "10", cardImage: clubsOf10,  value: 10 },
  ]
  
  const myStorage = window.localStorage
  const [playerCards, setPlayerCards, playerCardsRef] = useState([])
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
          dealerWinsMessage()
        }
        if (dealerHand > 21) {
          console.log('dealerhand: ', dealerHand)
          console.log('dearlerHand > 21')
          dealerBustMessage()
          return
        }
        if (dealerHand >= 17) {
          console.log('dealerhand: ', dealerHand)
          console.log('dearlerHand is => 17')
          if (dealerHand > playerHand) {
            console.log('dealerhand: ', dealerHand)
            console.log('dearlerHand is > playerHand')
            dealerWinsMessage()
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
            dealerBustMessage()
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

  const dealerWinsMessage = () => {
    Swal.fire(`Dealer wins with ${dealerHand} points.`)
    setIsStandButtonClicked(false)
    clearOutput()
    enableCoinButtons()
  }

  const dealerBustMessage = () => {
    Swal.fire(`Dealer bust with ${dealerHand} points. You win \\o/`)
    setIsStandButtonClicked(false)
    setCash(parseInt(myStorage.getItem('cash')) + deal)
    clearOutput()
    enableCoinButtons()
  }

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
    return Array(1)
      .fill([...spadesSuit, ...heartsSuit, ...diamondsSuit, ...clubsSuit])
      .reduce((a, b) => a.concat(b));
  };

  console.log('pack: ', packOfCards())

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

    console.log(playerCard_1)
    console.log(playerCard_1.suit)
    console.log(playerCard_1.cardImage)
    console.log(playerCard_1.value)

    setPlayerHand(playerHand + playerCard_1.value + playerCard_2.value);
    setPlayerCards((cards) => [...cards, playerCard_1.cardImage]);
    setPlayerCards((cards) => [...cards, playerCard_2.cardImage]);
    setDealerHand(dealerHand + dealerCard.value);
    setDealerCards((cards) => [...cards, dealerCard.cardImage]);

    console.log('playerCards: ', playerCardsRef)
    console.log('playerHand: ', playerHand)
    
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
    setPlayerCards((cards) => [...cards, card.cardImage]);
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
    setDealerCards((cards) => [...cards, card.cardImage]);
  };

  return (
    <div>
      <h1>Cash: ${cash}</h1>
      <h1>Dealer Hand: {dealerHand}</h1>
      <h2>Dealer Cards: {dealerCards.map(card => <img style={{padding: 10}} width='100' height='150' src={card} alt='ppp' />)}</h2>
      <h1>Deal: {deal}</h1>
      <h1>Player Hand: {playerHandRef.current}</h1>
      <div>Player Cards: {playerCards.map(card => <img style={{padding: 10}} width='100' height='150' src={card} alt='ppp' />)}</div>
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
