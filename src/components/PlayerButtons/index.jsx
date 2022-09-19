import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const PlayerButtons = ({ gameStarted, startGame }) => {
  return (
    <div className="buttonContainer">
      <button className="button" type="button">
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
      {!gameStarted && (
        <button className="button" type="button" onClick={startGame}>
          Start Game
        </button>
      )}
    </div>
  );
};

PlayerButtons.propTypes = {
  gameStarted: PropTypes.bool.isRequired,
  startGame: PropTypes.func.isRequired
};

export default PlayerButtons;
