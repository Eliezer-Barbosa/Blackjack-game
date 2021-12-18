import { useEffect } from "react";
import useState from "react-usestateref";
import {
  Button,
  ButtonGroup,
  Divider,
  Grid,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Box, useTheme } from "@mui/system";
import Swal from "sweetalert2";

import { spadesSuit, heartsSuit, diamondsSuit, clubsSuit } from "./cards";

const App = () => {
  const { breakpoints } = useTheme();
  const isMobile = useMediaQuery(breakpoints.down("sm"));

  const myStorage = window.localStorage;
  const [playerCards, setPlayerCards, playerCardsRef] = useState([]);
  const [dealerCards, setDealerCards] = useState([]);
  const [playerHand, setPlayerHand, playerHandRef] = useState(0);
  const [dealerHand, setDealerHand] = useState(0);
  const [deal, setDeal] = useState(0);
  const [cash, setCash, cashRef] = useState(
    parseInt(myStorage.getItem("cash"))
  );
  const [isHitButtonDisabled, setIsHitButtonDisabled] = useState(true);
  const [isStandButtonDisabled, setIsStandButtonDisabled] = useState(true);
  const [isCoinButtonsDisabled, setIsCoinButtonsDisabled] = useState(false);
  const [isStandButtonClicked, setIsStandButtonClicked] = useState(false);
  const coins = [1, 5, 10, 25, 50, 100, 1000];

  useEffect(() => {
    myStorage.setItem("cash", JSON.stringify(cash));
  }, [cash]);

  useEffect(() => {
    console.log("deal has been changed");
    if (deal > 0) {
      document.querySelector("#deal").disabled = false;
      document.querySelector("#clear").disabled = false;
    }
  }, [deal]);

  useEffect(() => {
    if (playerCards.length > 0) {
      document.querySelector("#clear").disabled = true;
      document.querySelector("#deal").disabled = true;
    }
  }, [playerCards]);

  useEffect(() => {
    console.log("dealerHand useEffect Deal: ", deal);
    if (dealerHand <= 11 && isStandButtonClicked) {
      console.log("dealerHand is < 11");
      console.log("getting another card...");
      setTimeout(() => {
        handleStandClick();
      }, 1000);
      return;
    }
    if (dealerHand > 11) {
      console.log("dealerhand: ", dealerHand);
      console.log("dearlerHand is > 11");
      console.log("activating setTimeout...");
      setTimeout(() => {
        if (dealerHand === 21) {
          console.log("dealerhand: ", dealerHand);
          console.log("dearlerHand is === 21");
          dealerWinsMessage();
        }
        if (dealerHand > 21) {
          console.log("dealerhand: ", dealerHand);
          console.log("dearlerHand > 21");
          dealerBustMessage();
          return;
        }
        if (dealerHand >= 17) {
          console.log("dealerhand: ", dealerHand);
          console.log("dearlerHand is => 17");
          if (dealerHand > playerHand) {
            console.log("dealerhand: ", dealerHand);
            console.log("dearlerHand is > playerHand");
            dealerWinsMessage();
            return;
          }
          if (dealerHand === playerHand) {
            console.log("dealerhand: ", dealerHand);
            console.log("dearlerHand is === playerHand");
            Swal.fire(`Draw.`);
            setCash(parseInt(myStorage.getItem("cash")) + deal / 2);
            setIsStandButtonClicked(false);
            clearOutput();
            enableCoinButtons();
            return;
          }
          if (dealerHand < playerHand) {
            console.log("dealerhand: ", dealerHand);
            console.log("dearlerHand is < playerHand");
            dealerBustMessage();
            return;
          }
        } else {
          console.log("dealerhand: ", dealerHand);
          console.log("dearlerHand is < 17");
          handleStandClick();
        }
      }, 1000);
    }
  }, [dealerHand]);

  const dealerWinsMessage = () => {
    Swal.fire(`Dealer wins with ${dealerHand} points.`);
    setIsStandButtonClicked(false);
    clearOutput();
    enableCoinButtons();
  };

  const dealerBustMessage = () => {
    Swal.fire(`Dealer bust with ${dealerHand} points. You win \\o/`);
    setIsStandButtonClicked(false);
    setCash(parseInt(myStorage.getItem("cash")) + deal);
    clearOutput();
    enableCoinButtons();
  };

  const clearOutput = () => {
    setTimeout(() => {
      setDealerHand(0);
      setDealerCards([]);
      setDeal(0);
      setPlayerHand(0);
      setPlayerCards([]);
    }, 2000);
  };

  const enableCoinButtons = () => {
    setTimeout(() => {
      setIsHitButtonDisabled(true);
      setIsStandButtonDisabled(true);
      setIsCoinButtonsDisabled(false);
    }, 2000);
  };

  const packOfCards = () => {
    return Array(1)
      .fill([...spadesSuit, ...heartsSuit, ...diamondsSuit, ...clubsSuit])
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
    setCash(parseInt(myStorage.getItem("cash")) - cashValue);
    setDeal(deal + cashValue);
  };

  const handleClearDeal = () => {
    setDeal(0);
    setCash(parseInt(myStorage.getItem("cash")) + deal);
  };

  const disableDealAndClearButtoms = () => {
    document.querySelector("#deal").disabled = true;
    document.querySelector("#clear").disabled = true;
  };

  const handleDealClick = () => {
    disableDealAndClearButtoms();
    setIsCoinButtonsDisabled(true);

    const dealerCard = getACard();
    const playerCard_1 = getACard();
    const playerCard_2 = getACard();

    console.log(playerCard_1);
    console.log(playerCard_1.suit);
    console.log(playerCard_1.cardImage);
    console.log(playerCard_1.value);

    setPlayerHand(playerHand + playerCard_1.value + playerCard_2.value);
    setPlayerCards((cards) => [...cards, playerCard_1.cardImage]);
    setPlayerCards((cards) => [...cards, playerCard_2.cardImage]);
    setDealerHand(dealerHand + dealerCard.value);
    setDealerCards((cards) => [...cards, dealerCard.cardImage]);

    console.log("playerCards: ", playerCardsRef);
    console.log("playerHand: ", playerHand);

    setIsHitButtonDisabled(playerHandRef.current === 21 ? true : false);
    setIsStandButtonDisabled(playerHandRef.current === 21 ? true : false);

    // double because the dealer place the same bet as the player
    const dealDouble = deal * 2;
    setDeal(dealDouble);

    if (playerHandRef.current === 21) {
      clearOutput();
      enableCoinButtons();
      setTimeout(() => {
        // player get the deal cash
        setCash(parseInt(myStorage.getItem("cash")) + dealDouble);
        console.log("cash: ", cash);
        console.log("cashRef: ", cashRef);
        Swal.fire(`You got ${playerHandRef.current} \\o/ BLACKJACK!!!`);
      }, 1000);
      return;
    }
  };

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
      setCash(parseInt(myStorage.getItem("cash")) + deal);
      Swal.fire(`You win with ${playerHandRef.current} points - BLACKJACK!!!`);
      clearOutput();
      enableCoinButtons();
      return;
    }
    if (playerHandRef.current > 21) {
      Swal.fire("You lose...");
      clearOutput();
      setIsHitButtonDisabled(true);
      setIsStandButtonDisabled(true);
      enableCoinButtons();
      return;
    }
  };

  const handleStandClick = () => {
    setIsStandButtonClicked(true);
    setIsHitButtonDisabled(true);
    setIsStandButtonDisabled(true);
    const card = getACard();
    // console.log("dealer card: ", card.value);
    setDealerHand(dealerHand + card.value);
    setDealerCards((cards) => [...cards, card.cardImage]);
  };

  return (
    <Grid container sx={{ backgroundColor: "#c5d4e6" }}>
      <Grid
        item
        sx={{
          width: "100%",
          height: "35vh",
        }}
      >
        <Box
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h4">Cash: {cash}</Typography>
          <Typography variant="h4">Deal: {deal}</Typography>
        </Box>
        <Divider />
        <Box
          style={{
            display: isMobile ? "" : "flex",
            justifyContent: "space-evenly",
          }}
        >
          <Box>
            <Typography variant="h3" gutterBottom>
              Dealer hand: {dealerHand}
            </Typography>
          </Box>
          <Box>
            <Typography variant="h3">
              Player hand: {playerHandRef.current}
            </Typography>
          </Box>
        </Box>
        <Box
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            visibility: deal === 0 && "hidden",
          }}
          pb="5px"
        >
          <Button
            fullWidth
            variant="contained"
            disabled={deal === 0 || isCoinButtonsDisabled}
            id="deal"
            onClick={handleDealClick}
          >
            DEAL
          </Button>
          <Button
            fullWidth
            variant="contained"
            disabled={deal === 0 || isCoinButtonsDisabled}
            id="clear"
            onClick={handleClearDeal}
          >
            CLEAR DEAL
          </Button>
          <Button
            fullWidth
            variant="contained"
            disabled={isHitButtonDisabled}
            id="hit"
            onClick={handleHitClick}
          >
            HIT
          </Button>
          <Button
            fullWidth
            variant="contained"
            disabled={isStandButtonDisabled}
            id="stand"
            onClick={handleStandClick}
          >
            STAND
          </Button>
        </Box>
        <Box>
          <ButtonGroup style={{ display: "flex" }}>
            {coins.map((coin) => (
              <Button
                fullWidth
                variant="contained"
                disabled={isCoinButtonsDisabled}
                onClick={handleCoinClick}
                key={coin}
              >
                {coin}
              </Button>
            ))}
          </ButtonGroup>
        </Box>
      </Grid>
      <Grid
        item
        sx={{
          display: isMobile ? "" : "flex",
          justifyContent: "space-evenly",
          width: "100%",
          height: "65vh",
        }}
      >
        <Box pt="15px">
          <Typography variant="h4">Dealer cards</Typography>
          {dealerCards.map((card) => (
            <img
              style={{ padding: 10 }}
              width="100"
              height="150"
              src={card}
              alt="dealerCard"
            />
          ))}
        </Box>
        <Box pt="15px">
          <Typography variant="h4">Player cards</Typography>
          {playerCards.map((card) => (
            <img
              style={{ padding: 10 }}
              width="100"
              height="150"
              src={card}
              alt="playerCard"
            />
          ))}
        </Box>
      </Grid>
    </Grid>
  );
};

export default App;
