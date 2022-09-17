import React, { useEffect, useReducer, useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { injectStyle } from 'react-toastify/dist/inject-style';
import './App.css';
import TagManager from 'react-gtm-module';
import MetaData from './components/Meta/MetaData';
import PlayerCards from './components/PlayerCards';
import PlayerButtons from './components/PlayerButtons';
import reducer from './reducer/reducer';
import initialState from './reducer/initialState';

const tagManagerArgs = {
  gtmId: 'G-R84ZFX4D61'
};

TagManager.initialize(tagManagerArgs);
// import background from "./images/bj-bg.jpg";

if (typeof window !== 'undefined') {
  injectStyle();
}

const App = () => {
  const [canHit, setCanHit] = useState(true);
  const [deal, setDeal] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [state] = useReducer(reducer, initialState);

  let dealerSum = 0;
  const dealerCards = useRef(null);
  const yourCards = useRef(null);

  const { tenClub, twoClub } = state;

  // var canHit = true;
  let yourSum = 0;

  let dealerAceCount = 0;
  let yourAceCount = 0;

  let hidden;
  let deck;

  const buildDeck = () => {
    const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

    const types = ['C', 'D', 'H', 'S'];

    deck = [];

    for (let i = 0; i < types.length; i += 1) {
      for (let j = 0; j < values.length; j += 1) {
        deck.push(`${values[j]}-${types[i]}`);
      }
    }
    // console.log(deck);
  };

  const shuffleDeck = () => {
    for (let i = 0; i < deck.length; i += 1) {
      const j = Math.floor(Math.random() * deck.length);
      const temp = deck[i];
      deck[i] = deck[j];
      deck[j] = temp;
    }
    // console.log("shuffle deck", deck);
  };

  // const info = () => toast('wow so easy');

  useEffect(() => {
    buildDeck();
    shuffleDeck();
    // startNewGame();
  }, []);

  // window.onload = (event) => {
  //   buildDeck();
  //   shuffleDeck();
  //   startNewGame();
  // };

  //  <script
  //     async
  //     src="https://www.googletagmanager.com/gtag/js?id=G-R84ZFX4D61"
  //   ></script>
  //   <script>
  //     window.dataLayer = window.dataLayer || [];
  //     function gtag() {
  //       dataLayer.push(arguments);
  //     }
  //     gtag("js", new Date());

  //     gtag("config", "G-R84ZFX4D61");
  //   </script>

  const getValue = (card) => {
    const data = card.split('-');
    const cardValue = data[0];
    const regex = /^[A|J|Q|K]$/g;

    if (regex.test(cardValue)) {
      if (cardValue === 'A') {
        return 11;
      }
      return 10;
    }
    return parseInt(cardValue, 10);
  };

  const checkAce = (card) => {
    if (card[0] === 'A') {
      return 1;
    }
    return 0;
  };

  const reduceAce = (playerSum, playerAceCount) => {
    let newPlayerSum = playerSum;
    let newPlayerAceCount = playerAceCount;
    while (newPlayerSum > 21 && newPlayerAceCount > 0) {
      newPlayerSum -= 10;
      newPlayerAceCount -= 1;
    }
    // console.log("playerSum", playerSum);
    return newPlayerSum;
  };

  function stay(mySum, myAceCount) {
    dealerSum = reduceAce(dealerSum, dealerAceCount);
    yourSum = reduceAce(yourSum, yourAceCount);
    const newSum = reduceAce(mySum, myAceCount);
    // canHit = false;
    setCanHit(false);
    document.getElementById('hidden').src = `../cards/${hidden}.png`;

    while (dealerSum < 17) {
      const cardImg = document.createElement('img');
      const card = deck.pop();
      cardImg.src = `../cards/${card}.png`;
      dealerSum += getValue(card);
      dealerAceCount += checkAce(card);
      // console.log("dealercards", dealerCards.current);
      // dealerCards.current.appendChild(cardImg);
      document.getElementById('dealer-cards').appendChild(cardImg);
    }

    let message = '';

    if (yourSum > 21) {
      if (yourSum <= 24) {
        toast.info('Better luck next time');
        message = 'You Lose';
      } else {
        toast.error('Sorry, the correct play is to Stay');
        message = 'You Lose';
      }
    } else if (dealerSum > 21) {
      message = 'You Win';
    } else if (yourSum === dealerSum) {
      if (yourSum <= 21) {
        toast.info("Great!  That's the correct play!");
        message = 'Tie';
      }
      message = 'You Lose';
    } else if (yourSum > dealerSum) {
      toast.info("Great!  That's the correct play!");
      message = 'You Win';
    } else if (yourSum < dealerSum) {
      if (dealerSum - yourSum <= 4) {
        toast.info('Better Luck next Time');
        message = 'You Lose';
      } else {
        toast.error('You should have clicked hit');
        message = 'You Lose';
      }
      message = 'You Lose';
    }

    if (newSum > 21) {
      if (newSum <= 24) {
        toast.info('Better Luck next Time');
        message = 'You Lose';
      } else {
        toast.error('Sorry, the correct play is to Stay');
        message = 'You Lose';
      }
    } else if (dealerSum > 21) {
      toast.info("Great!  That's the correct play!");
      message = 'You Win';
    } else if (newSum === dealerSum) {
      if (newSum <= 21) {
        toast.info("Great!  That's the correct play!");
        message = 'Tie';
      }
      message = 'You Lose';
    } else if (newSum > dealerSum) {
      toast.info("Great!  That's the correct play!");
      message = 'You Win';
    } else if (newSum < dealerSum) {
      if (dealerSum - newSum <= 4) {
        toast.info('Better Luck next Time');
        message = 'You Lose';
      } else {
        toast.error('You should have clicked hit');
        message = 'You Lose';
      }
      message = 'You Lose';
    }

    if (newSum) {
      document.getElementById('your-sum').innerText = newSum;
    }

    document.getElementById('your-sum').innerText = yourSum;
    document.getElementById('dealer-sum').innerText = dealerSum;
    document.getElementById('results').innerText = message;

    setDeal(true);
  }

  function hit() {
    if (!canHit) {
      // stay();
      return;
    }
    const cardImg = document.createElement('img');
    // console.log("deck", deck);
    const card = deck.pop();

    cardImg.src = `../cards/${card}.png`;
    yourSum += getValue(card);
    yourAceCount += checkAce(card);
    yourCards.current.appendChild(cardImg);

    const imgVal = document.getElementById('your-cards').getElementsByTagName('img')[0].src;

    const imgVal2 = document.getElementById('your-cards').getElementsByTagName('img')[1].src;

    const subsr1 = imgVal.slice(-7).charAt(0);
    const subsr2 = imgVal2.slice(-7).charAt(0);

    if (parseInt(subsr1, 10) === 10 && parseInt(subsr2, 10) === 10) {
      toast.info('You Should Stay');
    }

    if (subsr1 === subsr2) {
      toast.error('The Correct play is to split');
    }

    if (subsr1 === 'A' && subsr2 === 'A') {
      toast.info('You Should Split');
    }

    if (yourSum >= 17 && yourSum <= 21) {
      // toast.info("Call Stay");
    }

    if (reduceAce(yourSum, yourAceCount) > 21) {
      // canHit = false;

      setCanHit(false);
      stay();

      // console.log(canHit);
      // console.log("yourSuminHit");
    }
  }

  const doubleDown = () => {
    buildDeck();
    shuffleDeck();
    hit();
    // stay();

    const numOfImgTags = document.getElementById('your-cards');
    const count = numOfImgTags.getElementsByTagName('img').length;

    let newSum = 0;

    for (let k = 0; k < count; k += 1) {
      let yourCount = 0;

      const imgVal = document.getElementById('your-cards').getElementsByTagName('img')[k].src;

      const num = imgVal.slice(-7).charAt(0);
      const num2 = imgVal.slice(-7).charAt(1);

      if (num === num2) {
        toast.error('The Correct play is to split');
      }

      if (num === 'J' || num === 'K' || num === 'Q') {
        yourCount = 10;
        // console.log(num, "num num");
      } else if (num === 'A') {
        yourCount += 11;
        yourAceCount += 1;
      } else {
        if (num === '0') {
          yourCount += 10;
        }

        yourCount = parseInt(num, 10);
      }

      newSum += yourCount;

      if (newSum === 11 || newSum === 10) {
        toast.info('You should have doubled down');
      }
    }
    yourSum = newSum;

    const dealerImgTags = document.getElementById('dealer-cards');
    const dealerCount = dealerImgTags.getElementsByTagName('img')[0];
    const dealerCount2 = dealerImgTags.getElementsByTagName('img')[1];

    stay(yourSum, yourAceCount);

    dealerCount.remove();
    dealerCount2.remove();
  };

  const startNewGame = () => {
    setGameStarted(true);

    hidden = deck.pop();
    dealerSum += getValue(hidden);
    dealerAceCount += checkAce(hidden);
    // console.log("hidden", hidden);

    for (let i = 0; i < 1; i += 1) {
      // while (dealerSum < 17) {
      const cardImg = document.createElement('img');
      const card = deck.pop();
      cardImg.src = `../cards/${card}.png`;
      dealerSum += getValue(card);
      dealerAceCount += checkAce(card);
      // console.log("dealercards", dealerCards.current);
      // dealerCards.current.appendChild(cardImg);
      document.getElementById('dealer-cards').appendChild(cardImg);
    }
    // }
    // console.log("dealerSum", dealerSum);

    for (let i = 0; i < 2; i += 1) {
      const cardImg = document.createElement('img');
      const card = deck.pop();
      cardImg.src = `../cards/${card}.png`;
      yourSum += getValue(card);
      yourAceCount += checkAce(card);
      // yourCards.current.appendChild(cardImg);
      document.getElementById('your-cards').appendChild(cardImg);
    }

    // console.log("yoursum", yourSum);
    document.getElementById('hit').addEventListener('click', hit);
    document.getElementById('stay').addEventListener('click', stay);
  };

  function split() {
    const imgVal = document.getElementById('your-cards').getElementsByTagName('img')[0].src;

    const imgVal2 = document.getElementById('your-cards').getElementsByTagName('img')[1].src;

    const imgVal3 = document?.getElementById('your-cards')?.getElementsByTagName('img')[2]?.src;

    // console.log("imgVal", imgVal, imgVal2);

    const subsr1 = imgVal.slice(-7).charAt(0);

    const subsr2 = imgVal2.slice(-7).charAt(0);

    const subsr3 = imgVal3?.slice(-7).charAt(0);

    if (subsr1 !== subsr2) {
      toast.error('Split should only be called with two similar cards');
    }

    if (subsr1 === subsr2) {
      if (subsr1.toString() === 'A') {
        yourSum = 11; // 1;
        setDisabled(true);
      } else if (
        subsr1.toString() === 'Q' ||
        subsr1.toString() === 'J' ||
        subsr1.toString() === 'K'
      ) {
        yourSum = 10;
      } else {
        yourSum = parseInt(subsr1, 10);
      }
      stay(yourSum, yourAceCount);
    }

    if (subsr1 === subsr3) {
      if (subsr1.toString() === 'A') {
        yourSum = 11; // 1;
        setDisabled(true);
      } else if (
        subsr1.toString() === 'Q' ||
        subsr1.toString() === 'J' ||
        subsr1.toString() === 'K'
      ) {
        yourSum = 10;
      } else {
        yourSum = parseInt(subsr1, 10);
      }
      stay(yourSum, yourAceCount);
    }

    if (subsr2 === subsr3) {
      if (subsr2 === 'Q' || subsr2 === 'J' || subsr2 === 'K') {
        yourSum = 10;
      } else {
        yourSum = parseInt(subsr2, 10);
      }
      stay(yourSum, yourAceCount);
    }
  }

  const startGame = () => {
    startNewGame();
    // toast.info("Shuffling and Dealing Cards");
  };

  return (
    <div className="mainContainer">
      <PlayerCards cards={[tenClub, twoClub]} playerName="Dealer" />
      <PlayerCards cards={[tenClub, twoClub]} playerName="You" />
      <PlayerButtons />
      <MetaData title="How to Win at Cards" />
      <h1 className="blackjack" id="blackjack">
        How to Win at Blackjack
      </h1>
      <div
        className="App"
        // style={{ backgroundImage: `url(${background})`, height: "500px" }}
      >
        <div>
          <h2 style={{ text: 'white' }}>
            Dealer:
            <span id="dealer-sum" />
            <ToastContainer limit={1} autoClose={2000} />
          </h2>

          <div id="dealer-cards" className="dealer-cards" ref={dealerCards}>
            <img id="hidden" src="../cards/BACK.png" alt="card back" />
          </div>

          <h2>
            You: <span id="your-sum" />
          </h2>
          <div id="your-cards" ref={yourCards} />

          <div className="buttons">
            <button type="button" id="hit" className="hit" disabled={!canHit || disabled}>
              Hit
            </button>
            <button
              type="button"
              onClick={doubleDown}
              id="dd"
              disabled={!gameStarted}
              className="dd">
              Double Down
            </button>
            <button type="button" onClick={split} id="split" className="split">
              split
            </button>
            <button type="button" id="stay" className="stay" disabled={!canHit}>
              Stay
            </button>
          </div>

          <p id="results" />
          {deal ? (
            <div>
              <button
                type="button"
                className="deal"
                id="deal"
                onClick={() => window.location.reload()}>
                Deal
              </button>
            </div>
          ) : (
            <div />
          )}
          {/* <input value="RESTART GAME" onclick="history.go(0)" type="button" /> */}
        </div>
        {!gameStarted ? (
          <button
            type="button"
            className="deal"
            id="deal"
            onClick={startGame}
            disabled={gameStarted}>
            Start Game
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default App;
