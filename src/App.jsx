import React, { useEffect, useReducer, useState } from 'react';
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
  const { userGame, dealerGame, gameStarted } = store;
  const [userScore, setUserScore] = useState(0);
  const [dealerScore, setDealerScore] = useState(0);
  const [gameStayed, setGameStayed] = useState(false);

  const startGame = () => {
    dispatch({ type: types.startGame });
  };

  const hit = () => {
    dispatch({ type: types.hit });
  };

  const dealerOpensHand = () => {
    dispatch({ type: types.dealerOpensCard });
  };

  const stay = async () => {
    dealerOpensHand();
    setGameStayed(true);
  };

  const getNewScore = (hand) => {
    return hand.reduce((acc, card) => acc + card.value, 0);
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
    setDealerScore(getNewScore(dealerGame));
  }, [dealerGame]);

  useEffect(() => {
    setUserScore(getNewScore(userGame));
  }, [userGame]);

  useEffect(() => {
    if (userScore > 21) {
      stay();
      dispatch({ type: types.endGame });
    }
  }, [userScore]);

  useEffect(() => {
    if (gameStayed && dealerScore < 17) {
      dealerTakesCard();
    }
  }, [gameStayed, dealerScore]);

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
        showScore={gameStayed}
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
        hit={hit}
        stay={stay}
      />
    </div>
  );
};

export default App;
