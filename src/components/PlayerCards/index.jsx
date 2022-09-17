import React from 'react';
import PropTypes from 'prop-types';
import Card from '../Card';
import './style.css';

const PlayerCards = ({ cards, playerName, score, showCards }) => {
  return (
    <div className="playerContainer">
      <h2 className="playerName">{`${playerName}: ${score}`}</h2>
      {showCards && (
        <div>
          {cards.map((card) => (
            <Card key={card.id} card={card} />
          ))}
        </div>
      )}
    </div>
  );
};

PlayerCards.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string,
      url: PropTypes.string
    })
  ).isRequired,
  playerName: PropTypes.string.isRequired,
  score: PropTypes.number,
  showCards: PropTypes.bool.isRequired
};

PlayerCards.defaultProps = {
  score: 0
};

export default PlayerCards;
