const sleep = (milliseconds) => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, milliseconds);
  });
};
// export const bfs = async (grid, start, destination, callback) => {
//   let disMin = Number.MAX_SAFE_INTEGER;
//   const visited = new Map();
//   const dirs = [
//     [-1, 0],
//     [1, 0],
//     [0, -1],
//     [0, 1],
//   ];
//   const isOutside = (i, j) => {
//     return i < 0 || j < 0 || i >= grid.length || j >= grid[0].length;
//   };

//   const roll = (i, j, dir) => {
//     while (
//       !isOutside(i + dir[0], j + dir[1]) &&
//       grid[i + dir[0]][j + dir[1]].state !== 1
//     ) {
//       console.log(i + dir[0], j + dir[1]);
//       i += dir[0];
//       j += dir[1];
//     }
//     console.log(i + dir[0], j + dir[1]);
//     return [i, j];
//   };

//   //bfs
//   const helper = (i, j) => {
//     const queue = [[i, j, 0]];
//     while (queue.length) {
//       const { length } = queue;

//       for (let i = 0; i < length; i++) {
//         const [x, y, dis] = queue.pop();
//         const key = `${x}|${y}`;

//         if (x === destination[0] && y === destination[1])
//           disMin = Math.min(disMin, dis);
//         console.log(dis);
//         if (visited.has(key) && dis >= visited.get(key)) continue; // key condition

//         visited.set(key, dis);

//         // break into four directions
//         const up = roll(x, y, [-1, 0]);
//         const down = roll(x, y, [1, 0]);
//         const left = roll(x, y, [0, -1]);
//         const right = roll(x, y, [0, 1]);
//         // console.log(up, down, left, right);
//         if (up) queue.unshift([up, dis + Math.abs(up[0] - x)]);
//         if (down) queue.unshift([...down, dis + Math.abs(down[0] - x)]);
//         if (left) queue.unshift([...left, dis + Math.abs(left[1] - y)]);
//         if (right) queue.unshift([...right, dis + Math.abs(right[1] - y)]);

//         // or one-liner
//         // dirs
//         //   .map((dir) => roll(x, y, dir))
//         //   .forEach(([a, b]) =>
//         //     queue.unshift([a, b, dis + Math.abs(x - a) + Math.abs(y - b)])
//         //   );
//       }
//     }
//     return disMin !== Number.MAX_VALUE ? disMin : -1;
//   };
//   let result = helper(start[0], start[1]);
//   console.log(result);
//   return helper(start[0], start[1]);
//   //   const [row, col] = start;
//   //   const [endRow, endCol] = end;
//   //   let queue = [[row, col]];

//   //   let set = new Set();
//   //   while (queue.length > 0) {
//   //     const [row, col] = queue.shift();

//   //     if (
//   //       row < 0 ||
//   //       col < 0 ||
//   //       row >= grid.length ||
//   //       col >= grid[0].length ||
//   //       grid[row][col].state !== 0 ||
//   //       set.has(`${row}+#${col}`)
//   //     ) {
//   //       continue;
//   //     }

//   //     callback(row, col);
//   //     set.add(`${row}+#${col}`);
//   //     await sleep(0);
//   //     if (row === endRow && col === endCol) {
//   //       break;
//   //     }

//   //     queue.push([row, col - 1]);
//   //     queue.push([row, col + 1]);
//   //     queue.push([row + 1, col]);
//   //     queue.push([row - 1, col]);
//   //   }
// };
// Start location will be in the following format:
// [distanceFromTop, distanceFromLeft]
export const bfs = async function (grid, startCoordinates, callback) {
  var distanceFromTop = startCoordinates[0];
  var distanceFromLeft = startCoordinates[1];

  // Each "location" will store its coordinates
  // and the shortest path required to arrive there
  var location = {
    distanceFromTop: distanceFromTop,
    distanceFromLeft: distanceFromLeft,
    path: [],
    status: 'Start',
  };

  // Initialize the queue with the start location already inside
  var queue = [location];
  const visited = new Set();
  // Loop through the grid searching for the goal
  while (queue.length > 0) {
    // Take the first location off the queue
    var currentLocation = queue.shift();
    // callback(currentLocation.distanceFromTop, currentLocation.distanceFromLeft);
    // await sleep(0);
    // Explore North
    var newLocationNorth = await exploreInDirection(
      currentLocation,
      'North',
      grid,
      callback,
      visited
    );

    if (newLocationNorth.status === 'Goal') {
      return newLocationNorth.path;
    } else if (newLocationNorth.status === 'Valid') {
      queue.push(newLocationNorth);
    }

    // Explore East
    var newLocationEast = await exploreInDirection(
      currentLocation,
      'East',
      grid,
      callback,
      visited
    );
    if (newLocationEast.status === 'Goal') {
      return newLocationEast.path;
    } else if (newLocationEast.status === 'Valid') {
      queue.push(newLocationEast);
    }

    // Explore South
    var newLocationSouth = await exploreInDirection(
      currentLocation,
      'South',
      grid,
      callback,
      visited
    );
    if (newLocationSouth.status === 'Goal') {
      return newLocationSouth.path;
    } else if (newLocationSouth.status === 'Valid') {
      queue.push(newLocationSouth);
    }

    // Explore West
    var newLocationWest = await exploreInDirection(
      currentLocation,
      'West',
      grid,
      callback,
      visited
    );
    if (newLocationWest.status === 'Goal') {
      return newLocationWest.path;
    } else if (newLocationWest.status === 'Valid') {
      queue.push(newLocationWest);
    }
  }

  // No valid path found
  return false;
};

// This function will check a location's status
// (a location is "valid" if it is on the grid, is not an "obstacle",
// and has not yet been visited by our algorithm)
// Returns "Valid", "Invalid", "Blocked", or "Goal"
var locationStatus = function (location, grid, set) {
  var maxRowSize = grid.length;
  var maxColSize = grid[0].length;
  var dft = location.distanceFromTop;
  var dfl = location.distanceFromLeft;

  if (
    location.distanceFromLeft < 0 ||
    location.distanceFromLeft >= maxColSize ||
    location.distanceFromTop < 0 ||
    location.distanceFromTop >= maxRowSize ||
    set.has(`${location.distanceFromTop}|${location.distanceFromLeft}`)
  ) {
    // location is not on the grid--return false
    return 'Invalid';
  } else if (grid[dft][dfl].state === 'Goal') {
    return 'Goal';
  } else if (grid[dft][dfl].state !== 'Empty') {
    // location is either an obstacle or has been visited
    return 'Blocked';
  } else {
    return 'Valid';
  }
};

// Explores the grid from the given location in the given
// direction
var exploreInDirection = async function (
  currentLocation,
  direction,
  grid,
  callback,
  set
) {
  var newPath = currentLocation.path.slice();
  newPath.push(direction);

  var dft = currentLocation.distanceFromTop;
  var dfl = currentLocation.distanceFromLeft;

  if (direction === 'North') {
    dft -= 1;
  } else if (direction === 'East') {
    dfl += 1;
  } else if (direction === 'South') {
    dft += 1;
  } else if (direction === 'West') {
    dfl -= 1;
  }

  var newLocation = {
    distanceFromTop: dft,
    distanceFromLeft: dfl,
    path: newPath,
    status: 'Unknown',
  };
  newLocation.status = locationStatus(newLocation, grid, set);
  // callback(newLocation.distanceFromTop, newLocation.distanceFromLeft);
  // await sleep(0);
  // If this new location is valid, mark it as 'Visited'
  if (newLocation.status === 'Valid') {
    // grid[newLocation.distanceFromTop][newLocation.distanceFromLeft] = 'Visited';
    set.add(`${newLocation.distanceFromTop}|${newLocation.distanceFromLeft}`);
    callback(newLocation.distanceFromTop, newLocation.distanceFromLeft);
    await sleep(0);
  }

  return newLocation;
};
