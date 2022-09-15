import React from 'react';
import PropTypes from 'prop-types';

const Card = ({ card }) => {
  return <img src={card.image} alt={card.id} height={175} width={125} />;
};

Card.propTypes = {
  card: PropTypes.shape({ id: PropTypes.string, image: PropTypes.string }).isRequired
};

export default Card;
