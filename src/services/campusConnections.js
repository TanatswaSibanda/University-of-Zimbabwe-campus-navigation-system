// src/services/campusConnections.js
// REAL logical connections between buildings based on OSM data and campus layout

export const buildingConnections = [
  // === MAIN CORE (Great Hall area) ===
  { from: "Great Hall", to: "Main Library" },
  { from: "Great Hall", to: "Administration Block" },
  { from: "Great Hall", to: "UZ Photpgraphic Section" },


  // === LIBRARY AREA ===
  { from: "Main Library", to: "Administration Block" },
  { from: "Main Library", to: "Diamond Lecture Theatre" },
  { from: "Main Library", to: "Law Library" },
  { from: "Main Library", to: "Great Hall" },

  // === BEIT HALL AREA ===
  { from: "Beit Hall", to: "Student's Union Building" },
  { from: "Beit Hall", to: "NLT 500" },
  { from: "Beit Hall", to: "Senior Common Room" },

  // === STUDENT UNION AREA ===
  { from: "Student's Union Building", to: "Students Union Dining" },
  { from: "Student's Union Building", to: "Students Union Hall" },
  { from: "Student's Union Building", to: "Beit Hall" },


  { from: "Students Union Dining", to: "Students Union Hall" },
  { from: "Students Union Dining", to: "Student's Union Building" },

  { from: "Students Union Hall", to: "Students Union Dining" },
  { from: "Students Union Hall", to: "Student's Union Building" },

  // === NLT THEATRE AREA ===
  { from: "NLT 500", to: "Beit Hall" },
  { from: "NLT 500", to: "Senior Common Room" },
  { from: "NLT 500", to: "Survey" },

  // === SOCIAL SCIENCES AREA ===
  { from: "Social Sciences Department", to: "LTI" },
  { from: "Social Sciences Department", to: "LTII" },
  { from: "Social Sciences Department", to: "NLT 500" },
  { from: "Social Sciences Department", to: "Great Hall" },
  { from: "Social Sciences Department", to: "Main Library" },

  { from: "LTI", to: "LTII" },
  { from: "LTI", to: "Social Sciences Department" },

  { from: "LTII", to: "LTI" },
  { from: "LTII", to: "Social Sciences Department" },

  // === ADMINISTRATION AREA ===
  { from: "Administration Block", to: "Main Library" },
  { from: "Administration Block", to: "Great Hall" },
  { from: "Administration Block", to: "Diamond Lecture Theatre" },
  { from: "Administration Block", to: "CBZ Bank" },

  // === SCIENCE FACULTY AREA ===
  { from: "Faculty of Science", to: "Main Library" },
  { from: "Faculty of Science", to: "Maths and Chemistry" },
  { from: "Faculty of Science", to: "UZ Computer Centre" },
  { from: "Faculty of Science", to: "Zoology and Biology" },
  { from: "Faculty of Science", to: "Statistics" },

  { from: "Maths and Chemistry", to: "Faculty of Science" },
  { from: "Maths and Chemistry", to: "Dept of Physics" },
  { from: "Maths and Chemistry", to: "IES, Computer Science" },

  { from: "UZ Computer Centre", to: "Faculty of Science" },
  { from: "UZ Computer Centre", to: "Computer Science" },
  { from: "UZ Computer Centre", to: "Wildlife Section" },

  { from: "Computer Science", to: "UZ Computer Centre" },
  { from: "Computer Science", to: "IES, Computer Science" },
  { from: "Computer Science", to: "Statistics" },

  { from: "IES, Computer Science", to: "Computer Science" },
  { from: "IES, Computer Science", to: "Maths and Chemistry" },

  { from: "Statistics", to: "Computer Science" },
  { from: "Statistics", to: "Faculty of Science" },

  // === BIOLOGY/ZOOLOGY AREA ===
  { from: "Zoology and Biology", to: "Faculty of Science" },
  { from: "Zoology and Biology", to: "Wildlife Section" },
  { from: "Zoology and Biology", to: "Dept of Geography & Environmental Science" },

  { from: "Wildlife Section", to: "Zoology and Biology" },
  { from: "Wildlife Section", to: "UZ Computer Centre" },
  { from: "Wildlife Section", to: "Faculty of Agriculture" },

  // === GEOLOGY/GEOGRAPHY AREA ===
  { from: "Dept of Geology", to: "Mining" },
  { from: "Dept of Geology", to: "Rural and Urban Planning" },
  { from: "Dept of Geology", to: "Survey" },
  { from: "Dept of Geology", to: "Dept of Geography & Environmental Science" },

  { from: "Dept of Geography & Environmental Science", to: "Rural and Urban Planning" },
  { from: "Dept of Geography & Environmental Science", to: "Dept of Physics" },
  { from: "Dept of Geography & Environmental Science", to: "Zoology and Biology" },
  { from: "Dept of Geography & Environmental Science", to: "Dept of Geology" },

  { from: "Rural and Urban Planning", to: "Dept of Geology" },
  { from: "Rural and Urban Planning", to: "Dept of Geography & Environmental Science" },
  { from: "Rural and Urban Planning", to: "Survey" },

  // === PHYSICS/ENGINEERING AREA ===
  { from: "Dept of Physics", to: "Faculty of Agriculture" },
  { from: "Dept of Physics", to: "Dept of Geography & Environmental Science" },
  { from: "Dept of Physics", to: "Maths and Chemistry" },
  { from: "Dept of Physics", to: "Faculty of Engineering" },

  { from: "Faculty of Engineering", to: "Dept of Physics" },
  { from: "Faculty of Engineering", to: "Maths and Chemistry" },
  { from: "Faculty of Engineering", to: "Mining" },

  // === AGRICULTURE AREA ===
  { from: "Faculty of Agriculture", to: "Mining" },
  { from: "Faculty of Agriculture", to: "Dept of Physics" },
  { from: "Faculty of Agriculture", to: "Wildlife Section" },

  // === MINING/SURVEY AREA ===
  { from: "Mining", to: "Faculty of Agriculture" },
  { from: "Mining", to: "Dept of Geology" },
  { from: "Mining", to: "Survey" },
  { from: "Mining", to: "Faculty of Engineering" },

  { from: "Survey", to: "NLT 500" },
  { from: "Survey", to: "Dept of Geology" },
  { from: "Survey", to: "Mining" },
  { from: "Survey", to: "Rural and Urban Planning" },

  // === DIAMOND THEATRE AREA ===
  { from: "Diamond Lecture Theatre", to: "Main Library" },
  { from: "Diamond Lecture Theatre", to: "Administration Block" },

  // === CHAPEL/NEW HALL AREA ===
  { from: "Chapel", to: "Administration Block" },
  { from: "Chapel", to: "New Hall" },
  { from: "Chapel", to: "CBZ Bank" },

  { from: "New Hall", to: "Chapel" },
  { from: "New Hall", to: "Manfred Hostel" },

  { from: "Manfred Hostel", to: "New Hall" },
  { from: "Manfred Hostel", to: "NC5 Hostel" },

  { from: "NC5 Hostel", to: "Manfred Hostel" },
  { from: "NC5 Hostel", to: "New Hall" },

  // === SPORTS AREA ===
  { from: "Basketball Court", to: "Student's Union Building" },
  { from: "Basketball Court", to: "Sports Pavilion" },

  { from: "Sports Pavilion", to: "Basketball Court" },
  { from: "Sports Pavilion", to: "Student's Union Building" },

  // === CBZ BANK ===
  { from: "CBZ Bank", to: "Administration Block" },
  { from: "CBZ Bank", to: "Chapel" },

  // === HOSTELS ===
  { from: "Senior Common Room", to: "Beit Hall" },
  { from: "Senior Common Room", to: "Great Hall" }
];

// Build adjacency list for BFS (converts connections to a graph)
export function buildAdjacencyList() {
  const adjacencyList = {};

  for (const conn of buildingConnections) {
    if (!adjacencyList[conn.from]) adjacencyList[conn.from] = [];
    if (!adjacencyList[conn.to]) adjacencyList[conn.to] = [];

    adjacencyList[conn.from].push(conn.to);
    adjacencyList[conn.to].push(conn.from);
  }

  return adjacencyList;
}

// Updated BFS that finds the path with the FEWEST buildings
export function findShortestPathBFS(start, end) {
  if (start === end) {
    return { path: [start], success: true, steps: 0 };
  }

  const adjacencyList = buildAdjacencyList();

  if (!adjacencyList[start] || !adjacencyList[end]) {
    return { path: [], success: false, error: "Building not found" };
  }

  // BFS - finds the path with the LEAST number of buildings
  const queue = [[start]];
  const visited = new Set([start]);

  while (queue.length > 0) {
    const path = queue.shift();
    const current = path[path.length - 1];

    const neighbors = adjacencyList[current] || [];

    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        const newPath = [...path, neighbor];

        if (neighbor === end) {
          // Found the shortest path (first one found is shortest)
          return {
            path: newPath,
            success: true,
            steps: newPath.length - 1
          };
        }

        queue.push(newPath);
      }
    }
  }

  return { path: [], success: false, error: "No path exists" };
}
// Get walking suggestion text
export function getWalkingSuggestion(path) {
  if (!path || path.length < 2) return "";

  const steps = path.length - 1;
  if (steps === 1) {
    return `You can walk directly from ${path[0]} to ${path[1]}.`;
  } else if (steps === 2) {
    return `Walk from ${path[0]} to ${path[1]}, then to ${path[2]}.`;
  } else {
    const firstPart = `Walk from ${path[0]} to ${path[1]}`;
    const middleParts = path.slice(1, -1).map((b, i) => {
      if (i === 0) return `, then continue through ${b}`;
      return ` to ${b}`;
    }).join("");
    return `${firstPart}${middleParts}, and finally to ${path[path.length - 1]}.`;
  }
}

// Get all connections from a building
export function getConnections(buildingName) {
  const adjacencyList = buildAdjacencyList();
  return adjacencyList[buildingName] || [];
}

// Check if two buildings are connected directly
export function areConnected(building1, building2) {
  const connections = getConnections(building1);
  return connections.includes(building2);
}

// Get all unique buildings that have connections
export function getAllConnectedBuildings() {
  const adjacencyList = buildAdjacencyList();
  return Object.keys(adjacencyList).sort();
}

export default {
  buildingConnections,
  buildAdjacencyList,
  findShortestPathBFS,
  getWalkingSuggestion,
  getConnections,
  areConnected,
  getAllConnectedBuildings
};