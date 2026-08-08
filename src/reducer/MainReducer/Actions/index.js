import { SET_HIGHLIGHTS, SET_TEXT_A, SET_TEXT_B } from './ActionTypes/index.js';

export const setTextA = (text) => ({
  type: SET_TEXT_A,
  payload: text,
});

export const setTextB = (text) => ({
  type: SET_TEXT_B,
  payload: text,
});

export const setHighlights = (highlights) => ({
  type: SET_HIGHLIGHTS,
  payload: highlights,
});
