import { sleep } from './ult';

export const dfs = async function (grid, startCoordinates, end, callback) {
  var distanceFromTop = startCoordinates[0];
  var distanceFromLeft = startCoordinates[1];
  let result = search(grid, startCoordinates, end);
  console.log(result);
};

function search(grid, start, end) {
  if (
    start[0] < 0 ||
    start[1] < 0 ||
    start[0] >= grid.length ||
    start[1] >= grid[0].length ||
    grid[start[0]][start[1]] === 'Vistied'
  ) {
    return false;
  }
  if (grid[start[0]][start[1]] === grid[end[0]][end[1]]) {
    return true;
  }
  grid[start[0]][start[1]].state = 'Visited';
  search(grid, [start[0] + 1, start[1]], end);
  search(grid, [start[0], start[1] + 1], end);
  search(grid, [start[0] - 1, start[1]], end);
  search(grid, [start[0], start[1] - 1], end);
}

export const bfsAnimation = async (grid, start, paintFun, paintPathFun) => {};
