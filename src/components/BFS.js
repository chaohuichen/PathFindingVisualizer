const sleep = (milliseconds) => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, milliseconds);
  });
};
export const bfs = async (grid, start, destination, callback) => {
  let disMin = Number.MAX_SAFE_INTEGER;
  const visited = new Map();
  const dirs = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];
  const isOutside = (i, j) => {
    return i < 0 || j < 0 || i >= grid.length || j >= grid[i].length;
  };

  const roll = (i, j, dir) => {
    while (
      !isOutside(i + dir[0], j + dir[1]) &&
      grid[i + dir[0]][j + dir[1]].state !== 1
    ) {
      i += dir[0];
      j += dir[1];
    }
  };

  //bfs
  const helper = (i, j) => {
    const queue = [[i, j, 0]];
    while (queue.length) {
      const { length } = queue;

      for (let i = 0; i < length; i++) {
        const [x, y, dis] = queue.pop();
        const key = `${x}|${y}`;

        if (x === destination[0] && y === destination[1])
          disMin = Math.min(disMin, dis);
        console.log(dis);
        if (visited.has(key) && dis >= visited.get(key)) continue; // key condition

        visited.set(key, dis);

        // break into four directions
        const up = roll(x, y, [-1, 0]);
        const down = roll(x, y, [1, 0]);
        const left = roll(x, y, [0, -1]);
        const right = roll(x, y, [0, 1]);
        // console.log(up, down, left, right);
        if (up !== 'undefined') {
          console.log(up);
          queue.unshift([up, dis + Math.abs(up[0] - x)]);
        }
        if (down !== 'undefined')
          queue.unshift([...down, dis + Math.abs(down[0] - x)]);
        if (left !== 'undefined')
          queue.unshift([...left, dis + Math.abs(left[1] - y)]);
        if (right !== 'undefined')
          queue.unshift([...right, dis + Math.abs(right[1] - y)]);

        // or one-liner
        // dirs
        //   .map((dir) => roll(x, y, dir))
        //   .forEach(([a, b]) =>
        //     queue.unshift([a, b, dis + Math.abs(x - a) + Math.abs(y - b)])
        //   );
      }
    }
    return disMin !== Number.MAX_VALUE ? disMin : -1;
  };
  let result = helper(start[0], start[1]);
  console.log(result);
  return helper(start[0], start[1]);
  //   const [row, col] = start;
  //   const [endRow, endCol] = end;
  //   let queue = [[row, col]];

  //   let set = new Set();
  //   while (queue.length > 0) {
  //     const [row, col] = queue.shift();

  //     if (
  //       row < 0 ||
  //       col < 0 ||
  //       row >= grid.length ||
  //       col >= grid[0].length ||
  //       grid[row][col].state !== 0 ||
  //       set.has(`${row}+#${col}`)
  //     ) {
  //       continue;
  //     }

  //     callback(row, col);
  //     set.add(`${row}+#${col}`);
  //     await sleep(0);
  //     if (row === endRow && col === endCol) {
  //       break;
  //     }

  //     queue.push([row, col - 1]);
  //     queue.push([row, col + 1]);
  //     queue.push([row + 1, col]);
  //     queue.push([row - 1, col]);
  //   }
};
