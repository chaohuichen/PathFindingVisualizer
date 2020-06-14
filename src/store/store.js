import { createStore, applyMiddleware } from 'redux';
import loggerMiddleware from 'redux-logger';

//action type
let gird = new Array(5);
for (let i = 0; i < gird.length; ++i) {
  gird[i] = new Array(5).fill(0);
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

export const BFS = (grid) => {};
//reducer
function reducer(state = initialState, action) {
  switch (action.type) {
    case COLORIZE:
      const newGrid = [...state.grid];
      newGrid[action.row] = [...newGrid[action.row]];
      newGrid[action.row][action.column] = 'red';
      return { ...state, grid: newGrid };
    case CLEAR:
      return initialState;
    default:
      return state;
  }
}

const store = createStore(reducer);

export default store;
