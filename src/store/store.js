import { createStore, applyMiddleware } from 'redux';
import loggerMiddleware from 'redux-logger';
import girdStyle from './Grid.module.css';

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
  prevCellState: 'Empty',
  prevCellColor: '',
};
// const initialState = { grid: Array(20).fill(Array(80).fill('')) };

//action type
const COLORIZE = 'COLORIZE';
const CLEAR = 'CLEAR';
const SET_START = 'SET_START';
const PAINT_PATH = 'PAINT_PATH';
const DRAW_WALL = 'DRAW_WALL';

//action creator
export const colorize = (row, column) => ({ type: COLORIZE, row, column });
export const drawWall = (row, column) => ({ type: DRAW_WALL, row, column });
export const clear = () => ({ type: CLEAR });
export const setStart = (row, column) => ({ type: SET_START, row, column });
export const paintPath = (row, column) => ({ type: PAINT_PATH, row, column });
//reducer
function reducer(state = initialState, action) {
  switch (action.type) {
    case DRAW_WALL:
      const wallGrid = [...state.grid];
      wallGrid[action.row] = [...wallGrid[action.row]];
      wallGrid[action.row][action.column] = {
        ...wallGrid[action.row][action.column],
      };
      if (wallGrid[action.row][action.column].color === '') {
        wallGrid[action.row][action.column].state = 'Visited';
        wallGrid[action.row][action.column].color = girdStyle.wall;
      }
      return { ...state, grid: wallGrid };
    case COLORIZE:
      const newGrid = [...state.grid];
      newGrid[action.row] = [...newGrid[action.row]];
      newGrid[action.row][action.column] = {
        ...newGrid[action.row][action.column],
      };
      if (newGrid[action.row][action.column].color === '') {
        newGrid[action.row][action.column].state = 'Blocked';
        newGrid[action.row][action.column].color = girdStyle.element;
      }
      return { ...state, grid: newGrid };
    case CLEAR:
      return initialState;
    case SET_START:
      const moveGrid = [...state.grid];
      moveGrid[action.row] = [...moveGrid[action.row]];
      //change the prev cell state
      moveGrid[state.start[0]][state.start[1]] = {
        ...moveGrid[state.start[0]][state.start[1]],
      };
      moveGrid[state.start[0]][state.start[1]].state = state.prevCellState;
      moveGrid[state.start[0]][state.start[1]].color = state.prevCellColor;
      let prevState = moveGrid[action.row][action.column].state;
      let prevColor = moveGrid[action.row][action.column].color;
      //change the curr cell state
      moveGrid[action.row][action.column] = {
        ...moveGrid[action.row][action.column],
      };
      moveGrid[action.row][action.column].state = 'start';
      moveGrid[action.row][action.column].color = girdStyle.red;

      return {
        ...state,
        grid: moveGrid,
        start: [action.row, action.column],
        prevCellState: prevState,
        prevCellColor: prevColor,
      };
    case PAINT_PATH:
      //[east,north,south,west]
      const pathGrid = [...state.grid];
      pathGrid[action.row][action.column] = {
        ...pathGrid[action.row][action.column],
      };
      pathGrid[action.row][action.column].color = girdStyle.red;
      return { ...state, grid: pathGrid };
    default:
      return state;
  }
}

const store = createStore(reducer, applyMiddleware(loggerMiddleware));

export default store;
