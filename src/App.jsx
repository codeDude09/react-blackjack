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

  const startGame = () => {
    dispatch({ type: types.startGame });
  };

  useEffect(() => {
    if (gameStarted) {
      dispatch({ type: types.fillDeck });
      dispatch({ type: types.shuffleDeck });
      dispatch({ type: types.dealGame });
    }
  }, [gameStarted]);

  useEffect(() => {
    const newScore = dealerGame.reduce((acc, card) => acc + card.value, 0);
    setDealerScore(newScore);
  }, [dealerGame]);

  useEffect(() => {
    const newScore = userGame.reduce((acc, card) => acc + card.value, 0);
    setUserScore(newScore);
  }, [userGame]);

  return (
    <div className="mainContainer">
      <MetaData title="How to Win at Cards" />
      <h1 className="blackjack" id="blackjack">
        How to Win at Blackjack
      </h1>
      <PlayerCards cards={dealerGame} playerName="Dealer" showCards score={dealerScore} />
      <PlayerCards cards={userGame} playerName="You" showCards={gameStarted} score={userScore} />
      <PlayerButtons startGame={startGame} gameStarted={gameStarted} />
    </div>
  );
};

export default App;
