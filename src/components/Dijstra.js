import { sleep } from './ult';
var Heap = require('collections/heap');

export const Dijstra = async (grid, startCoordinates, end, callback) => {
  // let size = grid.length;
  // for (let i = 0; i < grid.length; ++i) {
  //   for (let j = 0; j < grid[0].length; ++j) {
  //     grid[i][j] = { ...grid[i][j] };
  //     grid[i][j].coord = [i, j];
  //     grid[i][j].distance = Infinity;
  //     if (i === startCoordinates[0] && j === startCoordinates[1]) {
  //       grid[i][j] = { ...grid[i][j] };
  //       grid[i][j].coord = [i, j];
  //       grid[i][j].distance = 0;
  //     }
  //   }
  // }
  const [startrow, startcol] = startCoordinates;
  grid[startrow][startcol].distance = 0;
  const unvisitedNodes = getAllNodes(grid);

  const visitedNodesInOrder = [];
  while (!!unvisitedNodes.length) {
    sortNodesByDistance(unvisitedNodes);
    const closestNode = unvisitedNodes.shift();
    callback(closestNode.row, closestNode.col);
    await sleep(0);
    if (closestNode.state === 'Visited') continue;

    if (closestNode.distance === Infinity) return visitedNodesInOrder;

    closestNode.state = 'Visited';
    visitedNodesInOrder.push(closestNode);

    if (closestNode === grid[end[0]][end[1]]) return visitedNodesInOrder;
    updateUnvisitedNeighbors(closestNode, grid);
  }
};

function getUnvisitedNeighbors(node, grid) {
  const neighbors = [];
  const { row, col } = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);

  return neighbors.filter((neighbor) => neighbor.state !== 'Visited');
}
function updateUnvisitedNeighbors(node, grid) {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);

  // console.log("nei",unvisitedNeighbors)
  for (const neighbor of unvisitedNeighbors) {
    neighbor.distance = node.distance + 1;
    neighbor.previousNode = node;
  }
}

function sortNodesByDistance(unvisitedNodes) {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

function getAllNodes(grid) {
  const nodes = [];
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }
  return nodes;
}

export function getNodesInShortestPathOrder(finishNode, grid) {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}

export async function DijstraAnimation(
  grid,
  start,
  end,
  paintFun,
  paintPathFun
) {
  await Dijstra(grid, start, end, paintFun);
  const path = getNodesInShortestPathOrder(grid[end[0]][end[1]]);

  for (let i = 0; i < path.length; ++i) {
    paintPathFun(path[i].row, path[i].col);
    await sleep(20);
  }
}
