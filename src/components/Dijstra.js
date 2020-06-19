import { sleep } from './ult';
var Heap = require('collections/heap');
const Dijstra1 = async function (grid, startCoordinates, callback) {
  let size = grid.length;
  var minHeap = new Heap(size ,function (left, right) {
   return left.distance-right.distance
  });
 
  for (let i = 0; i < grid.length; ++i) {
    for (let j = 0; j < grid[0].length; ++j) {
      grid[i][j] = { ...grid[i][j] };
      grid[i][j].coord = [i, j];
      grid[i][j].distance = Infinity;
    }
  }

  const [startRow, startCol] = startCoordinates;
  grid[startRow][startCol]={...grid[startRow][startCol]}
  grid[startRow][startCol].distance = 0;
  console.log(grid)
  // Horizontal and VerticalDistance
  let hVDistance = 1;

  // Diagonal Distance
  let dDistance = 1.4;

  /* for Manhattan Distances,
  double horizontalVerticalDistance = 1.0;
  double diagonalDistance = 2.0;
 
  for Chebyshev Distances,
  double horizontalVerticalDistance = 1.0;
  double diagonalDistance = 1.0; */
  minHeap.push(grid[startRow][startCol]);

 
  while (minHeap.length > 0) {
    let curr = minHeap.pop();
    
    console.log(curr )
      //top
      if (curr.coord[0] - 1 > 0) {
       let t ={...grid[curr.coord[0]-1][curr.coord[1]]};
       
        if (
            t.state === 'Empty' &&
          t.distance > curr.distance + hVDistance
        ) {
           
          t.distance = curr.distance + hVDistance;
          t.parent = curr;
         
          minHeap.push(t);
     
        }

      }
  
    // Left
    if (curr.coord[1] - 1 > 0) {
     let t = {...grid[curr.coord[0]][curr.coord[1] - 1]};
      if (
        t.state === 'Empty' &&
        t.distance > curr.distance + hVDistance
      ) {
        t.distance = curr.distance + hVDistance;
        t.parent = curr;
        minHeap.push(t);    

      }
  
    }
    // Right
    if (curr.coord[1] + 1 < size) {
      let  t ={...grid[curr.coord[0]][curr.coord[1] + 1]};
        if (
            t.state === 'Empty' && 
        t.distance > curr.distance + hVDistance
        ) {
        t.distance = curr.distance + hVDistance;
        t.parent = curr;
        minHeap.push(t);

     }
    
    }
    //down
    if (curr.coord[0] + 1 < size) {
      let  t ={...grid[curr.coord[0] + 1][curr.coord[1]]};
        if (
          t.state === 'Empty'&&
          t.distance > curr.distance + hVDistance
        ) {
          t.distance = curr.distance + hVDistance;
          t.parent = curr;   
          minHeap.push(t);
        }
    }
    
    curr.state="Visited"

  }

  //[10,39]
    let path = [];
    if (grid[4][4] !== Number.MAX_SAFE_INTEGER) {
      let curr = grid[4][4];
   
      while (curr.parent) {
     
        path.push(curr.parent);
        curr = curr.parent;
      }
    } else {
      console.log('no path');
    }
 
    return path;

};

export const Dijstra=(grid, startCoordinates, callback)=>{
    let size = grid.length;
    for (let i = 0; i < grid.length; ++i) {
        for (let j = 0; j < grid[0].length; ++j) {
          grid[i][j] = { ...grid[i][j] };
          grid[i][j].coord = [i, j];
          grid[i][j].distance = Infinity;
          if(i===startCoordinates[0]&& j==startCoordinates[1]){
            grid[i][j] = { ...grid[i][j] };
            grid[i][j].coord = [i, j];
            grid[i][j].distance = 0;
          }
        }
    }

    const unvisitedNodes = getAllNodes(grid);

    const visitedNodesInOrder = [];
    while(!!unvisitedNodes.length){
 
        sortNodesByDistance(unvisitedNodes)
        const closestNode = unvisitedNodes.shift()
      
        if(closestNode.state==="Visited" ||closestNode.state==='Blocked') continue
        
        if(closestNode.distance===Infinity) return visitedNodesInOrder
        closestNode.state= "Visited"
        visitedNodesInOrder.push(closestNode)
       
        if(closestNode === grid[4][4]) return visitedNodesInOrder
        updateUnvisitedNeighbors(closestNode, grid);
    }
   
}

function getUnvisitedNeighbors(node, grid) {
    const neighbors = [];
    const [col, row] = node.coord;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    return neighbors.filter(neighbor => neighbor.state!=="Visited");
  }
function updateUnvisitedNeighbors(node, grid) {
    const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
 
 
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

  export function getNodesInShortestPathOrder(finishNode,grid) {
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode) {
  
      nodesInShortestPathOrder.unshift(currentNode);
      currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
  }