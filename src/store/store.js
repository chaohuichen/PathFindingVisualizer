import { createStore, applyMiddleware } from 'redux';
import loggerMiddleware from 'redux-logger';

//action type
let gird = new Array(15);
for (let i = 0; i < gird.length; ++i) {
  gird[i] = new Array(30).fill('');
}
const initialState = { grid: gird };

const COLORIZE = 'COLORIZE';

export const colorize = (row, column) => ({ type: COLORIZE, row, column });

function reducer(state = initialState, action) {
  switch (action.type) {
    case COLORIZE:
      const newGrid = [...state.grid];
      newGrid[action.row] = [...newGrid[action.row]];
      newGrid[action.row][action.column] = 'red';
      return { ...state, grid: newGrid };
    default:
      return state;
  }
}

const store = createStore(reducer, applyMiddleware(loggerMiddleware));

export default store;
