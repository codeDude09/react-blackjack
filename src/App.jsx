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
  const [state, dispatch] = useReducer(reducer, initialState);
  const { userGame, dealerGame, gameStarted } = state;

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

  return (
    <div className="mainContainer">
      <MetaData title="How to Win at Cards" />
      <h1 className="blackjack" id="blackjack">
        How to Win at Blackjack
      </h1>
      <PlayerCards cards={dealerGame} playerName="Dealer" showCards />
      <PlayerCards cards={userGame} playerName="You" showCards={gameStarted} />
      <PlayerButtons startGame={startGame} gameStarted={gameStarted} />
    </div>
  );
};

export default App;
