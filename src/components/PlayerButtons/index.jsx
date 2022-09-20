import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const PlayerButtons = ({ gameStarted, gameStayed, startGame, hit, stay, reset, disabled }) => {
  return (
    <div className="buttonContainer">
      <button disabled={disabled} className="button" type="button" onClick={hit}>
        Hit
      </button>
      <button disabled={disabled} className="button" type="button">
        Double Down
      </button>
      <button disabled={disabled} className="button" type="button">
        Split
      </button>
      <button disabled={disabled} className="button" type="button" onClick={stay}>
        Stay
      </button>
      {!gameStarted && !gameStayed && (
        <button className="button" type="button" onClick={startGame}>
          Start Game
        </button>
      )}
      {!gameStarted && gameStayed && (
        <button className="button" type="button" onClick={reset}>
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
  hit: PropTypes.func.isRequired,
  stay: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired
};

export default PlayerButtons;
