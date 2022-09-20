import React, { useEffect, useReducer } from 'react';
// import { ToastContainer, toast } from 'react-toastify';
import { injectStyle } from 'react-toastify/dist/inject-style';
import './App.css';
import TagManager from 'react-gtm-module';
import MetaData from './components/Meta/MetaData';
import PlayerCards from './components/PlayerCards';
import PlayerButtons from './components/PlayerButtons';
import reducer from './reducer/reducer';
import initialState from './reducer/initialState';
import types from './reducer/types';

const tagManagerArgs = {
  gtmId: 'G-R84ZFX4D61'
};

TagManager.initialize(tagManagerArgs);

if (typeof window !== 'undefined') {
  injectStyle();
}

const App = () => {
  const [store, dispatch] = useReducer(reducer, initialState);
  const {
    userGame,
    dealerGame,
    gameStarted,
    gameStayed,
    userScore,
    dealerScore,
    allowSplit,
    splitted
  } = store;

  const startGame = () => {
    dispatch({ type: types.startGame });
  };

  const resetGame = () => {
    dispatch({ type: types.reset });
    dispatch({ type: types.setUserScore, payload: 0 });
    dispatch({ type: types.setDealerScore, payload: 0 });
    dispatch({ type: types.setGameStayed, payload: false });
  };

  const activateSplitted = () => {
    dispatch({ type: types.setSplitted, action: true });
  };

  const hit = () => {
    dispatch({ type: types.hit });
  };

  const dealerOpensHand = () => {
    dispatch({ type: types.dealerOpensCard });
  };

  const stay = () => {
    dealerOpensHand();
    dispatch({ type: types.setGameStayed, payload: true });
  };

  const getNewScore = (hand) => {
    let values = hand.map((card) => card.value);
    if (splitted) {
      values = new Set(values);
    }
    return values.reduce((acc, value) => acc + value, 0);
  };

  const dealerTakesCard = () => {
    dispatch({ type: types.dealerTakesCard });
  };

  useEffect(() => {
    if (gameStarted) {
      dispatch({ type: types.fillDeck });
      dispatch({ type: types.shuffleDeck });
      dispatch({ type: types.dealGame });
    }
  }, [gameStarted]);

  useEffect(() => {
    if (gameStarted) {
      const newScore = getNewScore(dealerGame);
      dispatch({ type: types.setDealerScore, payload: newScore });
    }
  }, [dealerGame, gameStarted]);

  useEffect(() => {
    if (gameStarted) {
      const newScore = getNewScore(userGame);
      dispatch({ type: types.setUserScore, payload: newScore });
    }
  }, [userGame, gameStarted]);

  useEffect(() => {
    if (userScore > 21) {
      console.log('you lose');
      dispatch({ type: types.setGameStayed, payload: true });
      dispatch({ type: types.endGame });
    }
  }, [userScore]);

  useEffect(() => {
    if (!gameStarted || !gameStayed) return;
    if (gameStarted && gameStayed && dealerScore < 17) {
      dealerTakesCard();
    }
    let message = 'you lose';
    if (dealerScore > 21) {
      message = 'you win';
    } else if (userScore > dealerScore) {
      message = 'you win ';
    }
    console.log(message);
    dispatch({ type: types.endGame });
  }, [gameStayed, dealerScore]);

  useEffect(() => {
    if (gameStarted) {
      const values = userGame.map((card) => card.value);
      const allowed = new Set(values).size !== values.lenght;
      dispatch({ type: types.setAllowSplit, payload: allowed });
    }
  }, [userGame, gameStarted]);

  return (
    <div className="mainContainer">
      <MetaData title="How to Win at Cards" />
      <h1 className="blackjack" id="blackjack">
        How to Win at Blackjack
      </h1>
      <PlayerCards
        cards={dealerGame}
        playerName="Dealer"
        showCards={gameStarted || gameStayed}
        score={dealerScore}
        showScore={!!(gameStayed && userScore <= 21)}
      />
      <PlayerCards
        cards={userGame}
        playerName="You"
        showCards={gameStarted || gameStayed}
        score={userScore}
        showScore={gameStayed}
      />
      <PlayerButtons
        startGame={startGame}
        gameStarted={gameStarted}
        gameStayed={gameStayed}
        showScore={gameStayed}
        disabled={!gameStarted || gameStayed}
        hit={hit}
        stay={stay}
        reset={resetGame}
        allowSplit={allowSplit}
        activateSplitted={activateSplitted}
      />
    </div>
  );
};

export default App;
