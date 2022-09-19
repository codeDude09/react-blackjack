import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const PlayerButtons = ({ gameStarted, gameStayed, startGame, hit }) => {
  return (
    <div className="buttonContainer">
      <button className="button" type="button" onClick={hit}>
        Hit
      </button>
      <button className="button" type="button">
        Double Down
      </button>
      <button className="button" type="button">
        Split
      </button>
      <button className="button" type="button">
        Stay
      </button>
      {!gameStarted && !gameStayed && (
        <button className="button" type="button" onClick={startGame}>
          Start Game
        </button>
      )}
      {!gameStarted && gameStayed && (
        <button className="button" type="button" onClick={startGame}>
          Deal!
        </button>
      )}
    </div>
  );
};

PlayerButtons.propTypes = {
  gameStarted: PropTypes.bool.isRequired,
  gameStayed: PropTypes.bool.isRequired,
  startGame: PropTypes.func.isRequired,
  hit: PropTypes.func.isRequired
};

export default PlayerButtons;
