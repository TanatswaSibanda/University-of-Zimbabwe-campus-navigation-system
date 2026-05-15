export const graph = {
  "Admin Block": {
    "Main Library": 2,
  },

  "Main Library": {
    "Admin Block": 2,
    "Computer Centre": 3,
  },

  "Computer Centre": {
    "Main Library": 3,
  },
};

export function dijkstra(graph, start, end) {

  const distances = {};
  const previous = {};
  const unvisited = new Set();

  for (const node in graph) {
    distances[node] = Infinity;
    previous[node] = null;
    unvisited.add(node);
  }

  distances[start] = 0;

  while (unvisited.size > 0) {

    let current = null;

    for (const node of unvisited) {
      if (
        current === null ||
        distances[node] < distances[current]
      ) {
        current = node;
      }
    }

    if (current === end) break;

    unvisited.delete(current);

    for (const neighbor in graph[current]) {

      const distance =
        distances[current] + graph[current][neighbor];

      if (distance < distances[neighbor]) {
        distances[neighbor] = distance;
        previous[neighbor] = current;
      }
    }
  }

  const path = [];
  let current = end;

  while (current) {
    path.unshift(current);
    current = previous[current];
  }

  return path;
}