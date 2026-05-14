export const graph = {
  "Main Library": {
    "Admin Block": 60
  },

  "Admin Block": {
    "Main Library": 60
  }
};


export function dijkstra(graph, start, end) {

  let distances = {};
  let visited = [];
  let previous = {};

  for (let node in graph) {
    distances[node] = Infinity;
  }

  distances[start] = 0;

  while (visited.length < Object.keys(graph).length) {

    let closestNode = null;

    for (let node in distances) {

      if (
        !visited.includes(node) &&
        (closestNode === null ||
          distances[node] < distances[closestNode])
      ) {
        closestNode = node;
      }
    }

    visited.push(closestNode);

    for (let neighbor in graph[closestNode]) {

      let newDistance =
        distances[closestNode] +
        graph[closestNode][neighbor];

      if (newDistance < distances[neighbor]) {

        distances[neighbor] = newDistance;

        previous[neighbor] = closestNode;
      }
    }
  }

  let path = [];
  let current = end;

  while (current) {

    path.unshift(current);

    current = previous[current];
  }

  return path;
}

