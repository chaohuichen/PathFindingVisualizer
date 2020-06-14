const sleep = (milliseconds) => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, milliseconds);
  });
};
export const bfs = async (grid, callback) => {
  let queue = [[0, 0]];

  let h = grid.length,
    l = grid[0].length;

  let map = new Map();
  while (queue.length > 0) {
    const [row, col] = queue.shift();

    if (
      row < 0 ||
      col < 0 ||
      row >= grid.length ||
      col >= grid[0].length ||
      grid[row][col] !== 0 ||
      map.has(`${row}+#${col}`)
    ) {
      continue;
    }
    callback(row, col);
    map.set(`${row}+#${col}`, 1);
    await sleep(0);
    if (row === h - 1 && col === l - 1) {
      break;
    }

    queue.push([row, col - 1]);
    queue.push([row, col + 1]);
    queue.push([row + 1, col]);
    queue.push([row - 1, col]);
  }
};
