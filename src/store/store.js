import { createStore, applyMiddleware } from 'redux';
import loggerMiddleware from 'redux-logger';
import girdStyle from './Grid.module.css';
import Grid from '../components/Grid';
//action type
let gird = new Array(20);
for (let i = 0; i < gird.length; ++i) {
  gird[i] = new Array(30).fill(0);
}
// gird[0][0] = 'green';
// gird[gird.length - 1][gird[0].length - 1] = 'blue';
const initialState = { grid: gird };
// const initialState = { grid: Array(20).fill(Array(80).fill('')) };
const COLORIZE = 'COLORIZE';
const CLEAR = 'CLEAR';
//action creator
export const colorize = (row, column) => ({ type: COLORIZE, row, column });
export const clear = () => ({ type: CLEAR });

//reducer
function reducer(state = initialState, action) {
  switch (action.type) {
    case COLORIZE:
      const newGrid = [...state.grid];
      newGrid[action.row] = [...newGrid[action.row]];
      newGrid[action.row][action.column] = girdStyle.element;
      return { ...state, grid: newGrid };
    case CLEAR:
      return initialState;
    default:
      return state;
  }
}

const store = createStore(reducer);

export default store;
