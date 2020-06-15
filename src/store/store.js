import { createStore, applyMiddleware } from 'redux';
import loggerMiddleware from 'redux-logger';
import girdStyle from './Grid.module.css';
import Grid from '../components/Grid';
import { act } from 'react-dom/test-utils';

let gird = new Array(20).fill([]);
for (let i = 0; i < gird.length; ++i) {
  gird[i] = new Array(40).fill({ state: 'Empty', color: '' });
}
gird[10][10] = { state: 'start', color: girdStyle.red };
gird[10][39] = { state: 'Goal', color: girdStyle.red };
// gird[10][10] = { state: 1, color: girdStyle.red };
const initialState = {
  grid: gird,
  start: [10, 10],
  end: [gird.length - 1, gird[0].length - 1],
};
// const initialState = { grid: Array(20).fill(Array(80).fill('')) };

//action type
const COLORIZE = 'COLORIZE';
const CLEAR = 'CLEAR';
const SET_START = 'SET_START';
const PAINT_PATH = 'PAINT_PATH';
//action creator
export const colorize = (row, column) => ({ type: COLORIZE, row, column });
export const clear = () => ({ type: CLEAR });
export const setStart = (start) => ({ type: SET_START, start });
export const paintPath = (row, column) => ({ type: PAINT_PATH, row, column });
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
        newGrid[action.row][action.column].state = 'Visited';
        newGrid[action.row][action.column].color = girdStyle.element;
      }
      return { ...state, grid: newGrid };
    case CLEAR:
      return initialState;
    case SET_START:
      return { ...state, start: action.start };
    case PAINT_PATH:
      //[east,north,south,west]
      const pathGrid = [...state.grid];
      pathGrid[action.row][action.column] = {
        ...pathGrid[action.row][action.column],
      };
      pathGrid[action.row][action.column].color = 'red';
      return { ...state, grid: pathGrid };
    default:
      return state;
  }
}

const store = createStore(reducer);

export default store;
