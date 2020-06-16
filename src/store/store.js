import { createStore, applyMiddleware } from 'redux';
import loggerMiddleware from 'redux-logger';
import girdStyle from './Grid.module.css';

let gird = new Array(20).fill([]);
for (let i = 0; i < gird.length; ++i) {
  gird[i] = new Array(40).fill({ state: 'Empty', color: '' });
  if (i === 11) {
    gird[10][10] = { state: 'start', color: girdStyle.red };
    gird[10][39] = { state: 'Goal', color: girdStyle.red };
  }
}

// gird[10][10] = { state: 1, color: girdStyle.red };
const initialState = {
  grid: gird,
  start: [10, 10],
  end: [10, 39],
  prevStartCellState: 'Empty',
  prevStartCellColor: '',
  prevEndCellState: 'Empty',
  prevEndCellColor: '',
};
// gird[10][10] = { state: 'start', color: girdStyle.red };
// gird[10][39] = { state: 'Goal', color: girdStyle.red };
// const initialState = { grid: Array(20).fill(Array(80).fill('')) };

//action type
const COLORIZE = 'COLORIZE';
const CLEAR = 'CLEAR';
const SET_START = 'SET_START';
const SET_END = 'SET_END';
const PAINT_PATH = 'PAINT_PATH';
const DRAW_WALL = 'DRAW_WALL';

//action creator
export const colorize = (row, column) => ({ type: COLORIZE, row, column });
export const drawWall = (row, column) => ({ type: DRAW_WALL, row, column });
export const clear = () => ({ type: CLEAR });
export const setStart = (row, column) => ({ type: SET_START, row, column });
export const setEnd = (row, column) => ({ type: SET_END, row, column });
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
        wallGrid[action.row][action.column].state = 'Blocked';
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
        newGrid[action.row][action.column].state = 'Visited';
        newGrid[action.row][action.column].color = girdStyle.element;
      }
      return { ...state, grid: newGrid };
    case CLEAR:
      // const initialGrid=[...initialSt]
      return initialState;
    case SET_START:
      const moveGrid = [...state.grid];
      moveGrid[action.row] = [...moveGrid[action.row]];
      //change the prev cell state
      moveGrid[state.start[0]][state.start[1]] = {
        ...moveGrid[state.start[0]][state.start[1]],
      };
      moveGrid[state.start[0]][state.start[1]].state = state.prevStartCellState;
      moveGrid[state.start[0]][state.start[1]].color = state.prevStartCellColor;
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
        prevStartCellState: prevState,
        prevStartCellColor: prevColor,
      };
    case SET_END:
      const moveEndGrid = [...state.grid];
      moveEndGrid[action.row] = [...moveEndGrid[action.row]];
      //change the prev cell state
      moveEndGrid[state.end[0]][state.end[1]] = {
        ...moveEndGrid[state.end[0]][state.end[1]],
      };
      moveEndGrid[state.end[0]][state.end[1]].state = state.prevEndCellState;
      moveEndGrid[state.end[0]][state.end[1]].color = '';
      let prevEndState = moveEndGrid[action.row][action.column].state;
      let prevEndColor = moveEndGrid[action.row][action.column].color;
      //change the curr cell state
      moveEndGrid[action.row][action.column] = {
        ...moveEndGrid[action.row][action.column],
      };
      moveEndGrid[action.row][action.column].state = 'Goal';
      moveEndGrid[action.row][action.column].color = girdStyle.red;

      return {
        ...state,
        grid: moveEndGrid,
        end: [action.row, action.column],
        prevEndCellState: prevEndState,
        prevEndCellColor: prevEndColor,
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
