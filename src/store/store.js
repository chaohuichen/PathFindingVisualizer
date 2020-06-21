import { createStore, applyMiddleware } from 'redux';
import loggerMiddleware from 'redux-logger';
import girdStyle from './Grid.module.css';

const createNode = (row, col) => {
  return {
    col,
    row,
    distance: Infinity,
    state: 'Empty',
    previousNode: null,
    icon: '',
    color: '',
    iconstyle: '',
  };
};

let gird = [];
for (let i = 0; i < 20; ++i) {
  //current row
  let row = [];
  for (let j = 0; j < 40; ++j) {
    row.push(createNode(i, j));
  }
  gird.push(row);
}
//set up the init start & end
gird[10][10].state = 'start';
gird[10][10].icon = 'fas fa-sun';
gird[10][39].state = 'Goal';
gird[10][39].icon = 'fas fa-bullseye';

const initialState = {
  grid: gird,
  start: [10, 10],
  end: [10, 39],
  prevStartCellState: 'Empty',
  prevStartCellColor: '',
  prevEndCellState: 'Empty',
  prevEndCellColor: '',
};

//action type
const COLORIZE = 'COLORIZE';
const CLEAR = 'CLEAR';
const SET_START = 'SET_START';
const SET_END = 'SET_END';
const PAINT_PATH = 'PAINT_PATH';
const DRAW_WALL = 'DRAW_WALL';
const CLEAR_PATH = 'CLEAR_PATH';
//action creator
export const colorize = (row, column) => ({ type: COLORIZE, row, column });
export const drawWall = (row, column) => ({ type: DRAW_WALL, row, column });
export const clear = () => ({ type: CLEAR });
export const setStart = (row, column) => ({ type: SET_START, row, column });
export const setEnd = (row, column) => ({ type: SET_END, row, column });
export const paintPath = (row, column) => ({ type: PAINT_PATH, row, column });
export const clearPath = () => ({ type: CLEAR_PATH });
//reducer
function reducer(state = initialState, action) {
  switch (action.type) {
    case DRAW_WALL:
      const wallGrid = [...state.grid];
      wallGrid[action.row] = [...wallGrid[action.row]];
      wallGrid[action.row][action.column] = {
        ...wallGrid[action.row][action.column],
      };
      if (
        wallGrid[action.row][action.column].state !== 'Goal' &&
        wallGrid[action.row][action.column].state !== 'start' &&
        wallGrid[action.row][action.column].state !== 'Blocked'
      ) {
        wallGrid[action.row][action.column].state = 'Blocked';
        wallGrid[action.row][action.column].color = girdStyle.wall;
      } else if (wallGrid[action.row][action.column].state === 'Blocked') {
        wallGrid[action.row][action.column].state = 'Empty';
        wallGrid[action.row][action.column].color = '';
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
        newGrid[action.row][action.column].color = girdStyle.visited;
      }

      return { ...state, grid: newGrid };
    case CLEAR_PATH:
      const clearPathGrid = [...state.grid];
      //set the start state back
      const [start_row, start_col] = state.start;
      clearPathGrid[start_row][start_col] = {
        ...clearPathGrid[start_row][start_col],
      };
      clearPathGrid[start_row][start_col].state = 'start';
      clearPathGrid[start_row][start_col].color = '';
      //set the goal state back
      const [end_row, end_col] = state.end;
      clearPathGrid[end_row][end_col] = { ...clearPathGrid[end_row][end_col] };
      clearPathGrid[end_row][end_col].state = 'Goal';
      clearPathGrid[end_row][end_col].color = '';
      for (let i = 0; i < clearPathGrid.length; ++i) {
        for (let j = 0; j < clearPathGrid[0].length; ++j) {
          if (clearPathGrid[i][j].state === 'Visited') {
            clearPathGrid[i][j] = { ...clearPathGrid[i][j] };
            clearPathGrid[i][j].state = 'Empty';
            clearPathGrid[i][j].color = '';
          }
        }
      }
      return { ...state, grid: clearPathGrid };
    case CLEAR:
      let clearGrid = [...initialState.grid];
      const [startrow, startcol] = initialState.start;
      clearGrid[startrow] = [...clearGrid[startrow]];
      clearGrid[startrow][startcol] = { ...clearGrid[startrow][startcol] };
      clearGrid[startrow][startcol] = {
        state: 'start',
        color: '',
        icon: 'fas fa-sun',
      };

      const [endrow, endcol] = initialState.end;
      clearGrid[endrow] = [...clearGrid[endrow]];
      clearGrid[endrow][endcol] = { ...clearGrid[endrow][endcol] };
      clearGrid[endrow][endcol] = {
        state: 'Goal',
        color: '',
        icon: 'fas fa-bullseye',
      };
      return {
        ...state,
        grid: clearGrid,
        start: initialState.start,
        end: initialState.end,
        prevStartCellState: initialState.prevStartCellState,
        prevStartCellColor: initialState.prevStartCellColor,
        prevEndCellState: initialState.prevEndState,
        prevEndCellColor: initialState.prevEndCellColor,
      };
    case SET_START:
      const moveGrid = [...state.grid];
      moveGrid[action.row] = [...moveGrid[action.row]];
      //change the prev cell state
      moveGrid[state.start[0]][state.start[1]] = {
        ...moveGrid[state.start[0]][state.start[1]],
      };
      moveGrid[state.start[0]][state.start[1]].state = state.prevStartCellState;
      moveGrid[state.start[0]][state.start[1]].color = state.prevStartCellColor;
      moveGrid[state.start[0]][state.start[1]].icon = '';
      //save the prev cell state for later change
      let prevState = moveGrid[action.row][action.column].state;
      let prevColor = moveGrid[action.row][action.column].color;
      //change the curr cell state
      moveGrid[action.row][action.column] = {
        ...moveGrid[action.row][action.column],
      };
      moveGrid[action.row][action.column].color = '';
      moveGrid[action.row][action.column].state = 'start';
      moveGrid[action.row][action.column].icon = 'fas fa-sun';
      moveGrid[action.row][action.column].iconstyle = girdStyle.start;
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
      moveEndGrid[state.end[0]][state.end[1]].color = state.prevEndCellColor;
      moveEndGrid[state.end[0]][state.end[1]].icon = '';

      //save the prev cell state for later change
      let prevEndState = moveEndGrid[action.row][action.column].state;
      let prevEndColor = moveEndGrid[action.row][action.column].color;
      //change the curr cell state
      moveEndGrid[action.row][action.column] = {
        ...moveEndGrid[action.row][action.column],
      };
      moveEndGrid[action.row][action.column].color = '';
      moveEndGrid[action.row][action.column].state = 'Goal';
      moveEndGrid[action.row][action.column].icon = 'fas fa-bullseye';
      moveEndGrid[action.row][action.column].iconstyle = girdStyle.end;
      return {
        ...state,
        grid: moveEndGrid,
        end: [action.row, action.column],
        prevEndCellState: prevEndState,
        prevEndCellColor: prevEndColor,
      };
    case PAINT_PATH:
      const pathGrid = [...state.grid];
      pathGrid[action.row][action.column] = {
        ...pathGrid[action.row][action.column],
      };
      pathGrid[action.row][action.column].color = girdStyle.path;
      return { ...state, grid: pathGrid };
    default:
      return state;
  }
}

const store = createStore(reducer, applyMiddleware());

export default store;
