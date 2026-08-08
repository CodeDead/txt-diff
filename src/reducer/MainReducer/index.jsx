import {
  SET_HIGHLIGHTS,
  SET_TEXT_A,
  SET_TEXT_B,
} from './Actions/ActionTypes/index.js';

const MainReducer = (state, action) => {
  switch (action.type) {
    case SET_TEXT_A:
      return {
        ...state,
        textA: action.payload,
      };
    case SET_TEXT_B:
      return {
        ...state,
        textB: action.payload,
      };
    case SET_HIGHLIGHTS:
      return {
        ...state,
        highlights: action.payload,
      };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};

export default MainReducer;
