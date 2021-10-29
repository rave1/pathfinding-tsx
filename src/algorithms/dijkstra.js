export function dijkstra(grid, startNode, finishNode){
    const visitedNodesInOrder = [];
    startNode.distance = 0;
    const unvisitedNodes = getAllNodes(grid);
    console.log(unvisitedNodes)
    while (!!unvisitedNodes.length){
        sortNodesByDistance(unvisitedNodes);
        const closestNode = unvisitedNodes.shift();
        // skip a wall
        if (closestNode.isWall) continue;
        // if the closest node has a dist of infinity -> skip\
        if (closestNode.distance === Infinity) return visitedNodesInOrder;
        closestNode.isVisited = true;
        visitedNodesInOrder.push(closestNode)
        if (closestNode === finishNode) return visitedNodesInOrder;
        updateUnvisitedNeighbors(closestNode, grid);
        
    }
}

function getAllNodes(grid){
    const nodes = [];
    for (let i = 0; i < grid.length; i++){
        for (let j = 0; j < grid[i].length; j++){
            nodes.push(grid[i][j]);
        }
    }
    return nodes;
}

function sortNodesByDistance(unvisitedNodes){
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

function updateUnvisitedNeighbors(node, grid){
    const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
    // console.log(unvisitedNeighbors)
    for (const neighbor of unvisitedNeighbors) {
        neighbor.distance = node.distance + 1;
        neighbor.previousNode = node;
      }
}

function getUnvisitedNeighbors(node, grid){
    const neighbors = [];
    const {col, row} = node;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    // console.log(neighbors)
    return neighbors.filter(neighbor => !neighbor.isVisited);
}

export function getNodesInShortestPathOrder(finishNode){
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode !== null){
        nodesInShortestPathOrder.unshift(currentNode);
        console.log(nodesInShortestPathOrder)
        currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
}