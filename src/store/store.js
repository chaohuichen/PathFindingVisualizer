import { createStore, applyMiddleware } from 'redux';
import loggerMiddleware from 'redux-logger';
import girdStyle from './Grid.module.css';
import Grid from '../components/Grid';
import { act } from 'react-dom/test-utils';

let gird = new Array(20).fill([]);
for (let i = 0; i < gird.length; ++i) {
  gird[i] = new Array(40).fill({ state: 0, color: '' });
}
gird[3][3] = { state: 1, color: girdStyle.red };
gird[10][10] = { state: 1, color: girdStyle.red };
const initialState = { grid: gird, start: [3, 3], end: [10, 10] };
// const initialState = { grid: Array(20).fill(Array(80).fill('')) };

//action type
const COLORIZE = 'COLORIZE';
const CLEAR = 'CLEAR';
const SET_START = 'SET_START';

//action creator
export const colorize = (row, column) => ({ type: COLORIZE, row, column });
export const clear = () => ({ type: CLEAR });
export const setStart = (start) => ({ type: SET_START, start });
//reducer
function reducer(state = initialState, action) {
  switch (action.type) {
    case COLORIZE:
      const newGrid = [...state.grid];

      newGrid[action.row] = [...newGrid[action.row]];

      newGrid[action.row][action.column] = {
        ...newGrid[action.row][action.column],
      };
      if (newGrid[action.row][action.column].color === '') {
        // newGrid[action.row][action.column].state = 1;
        newGrid[action.row][action.column].color = girdStyle.element;
      }
      return { ...state, grid: newGrid };
    case CLEAR:
      return initialState;
    case SET_START:
      return { ...state, start: action.start };
    default:
      return state;
  }
}

const store = createStore(reducer);

export default store;
