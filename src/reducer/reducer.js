import types from './types';
import cards from './cards';

const reducer = (state, action) => {
  let newState;
  let cardToDeal;
  switch (action.type) {
    case types.startGame:
      newState = { ...state, gameStarted: true };
      break;
    case types.fillDeck:
      newState = { ...state, deck: [...cards] };
      break;
    case types.shuffleDeck:
      newState = {
        ...state,
        deck: [...state.deck]
          .map((card) => ({ value: card, sort: Math.random() }))
          .sort((a, b) => a.sort - b.sort)
          .map(({ value }) => value)
      };
      break;
    case types.dealGame:
      newState = { ...state };
      cardToDeal = { ...newState.deck.pop() };
      newState.userGame.push({ ...cardToDeal, status: 'turnUp' });
      cardToDeal = newState.deck.pop();
      newState.dealerGame.push({ ...cardToDeal, status: 'turnUp' });
      cardToDeal = newState.deck.pop();
      newState.userGame.push({ ...cardToDeal, status: 'turnUp' });
      cardToDeal = newState.deck.pop();
      newState.dealerGame.push({ ...cardToDeal });
      break;
    case types.userScoreIncrease:
      newState = { ...state, userScore: state.userScore + action.payload };
      break;
    case types.dealerScoreIncrease:
      newState = { ...state, dealerScore: state.dealerScore + action.payload };
      break;
    default:
      throw new Error();
  }

  return newState;
};

export default reducer;
