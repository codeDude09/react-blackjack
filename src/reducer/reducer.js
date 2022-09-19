import types from './types';
import cards from './cards';

const reducer = (state, action) => {
  let newState;
  switch (action.type) {
    case types.startGame:
      newState = { ...state, gameStarted: true };
      break;
    case types.endGame:
      newState = { ...state, gameStarted: false };
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
      newState = {
        ...state,
        userGame: [
          { ...[...state.deck][state.deck.length - 1], status: 'turnUp' },
          { ...[...state.deck][state.deck.length - 3], status: 'turnUp' }
        ],
        dealerGame: [
          { ...[...state.deck][state.deck.length - 2], status: 'turnUp' },
          [...state.deck][state.deck.length - 4]
        ],
        deck: [...state.deck].slice(0, state.deck.length - 4)
      };
      break;
    case types.userScoreIncrease:
      newState = { ...state, userScore: state.userScore + action.payload };
      break;
    case types.dealerScoreIncrease:
      newState = { ...state, dealerScore: state.dealerScore + action.payload };
      break;
    case types.hit:
      newState = {
        ...state,
        userGame: [
          ...state.userGame,
          { ...[...state.deck][state.deck.length - 1], status: 'turnUp' }
        ],
        deck: [...state.deck].slice(0, -1)
      };
      break;
    default:
      throw new Error();
  }

  return newState;
};

export default reducer;
