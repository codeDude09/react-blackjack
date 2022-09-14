import types from './types';

const reducer = (state, action) => {
  let newState;
  switch (action.type) {
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
