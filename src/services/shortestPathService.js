// src/services/shortestPathService.js
import venues from "../components/venues";

// Get coordinates for a building by name
function getBuildingCoordinates(buildingName) {
    const building = venues.find(v => v.name === buildingName);
    if (building && building.position) {
        return {
            lat: building.position[0],
            lng: building.position[1]
        };
    }
    return null;
}

// Calculate straight-line distance between two coordinates (Haversine formula)
function calculateDistance(lat1, lng1, lat2, lng2) {
    const R = 6371000; // Earth's radius in meters
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

// Build the graph dynamically from actual building coordinates
function buildGraph() {
    const graph = {};

    // Only include buildings that have coordinates
    const buildingsWithCoords = venues.filter(v => v.position && v.position.length === 2);

    // For each building, calculate distance to every other building
    for (let i = 0; i < buildingsWithCoords.length; i++) {
        const building1 = buildingsWithCoords[i];
        graph[building1.name] = {};

        for (let j = 0; j < buildingsWithCoords.length; j++) {
            if (i !== j) {
                const building2 = buildingsWithCoords[j];
                const distance = calculateDistance(
                    building1.position[0], building1.position[1],
                    building2.position[0], building2.position[1]
                );

                // Add connection if distance is less than 300m (reasonable walking distance on campus)
                if (distance < 300) {
                    graph[building1.name][building2.name] = Math.round(distance);
                }
            }
        }
    }

    return graph;
}

// Cache the graph
let cachedGraph = null;

function getGraph() {
    if (!cachedGraph) {
        cachedGraph = buildGraph();
        console.log("Graph built with", Object.keys(cachedGraph).length, "buildings");
    }
    return cachedGraph;
}

// Dijkstra's Algorithm implementation
export function findShortestPath(startNode, endNode) {
    const graph = getGraph();

    if (startNode === endNode) {
        return { path: [startNode], distance: 0, success: true };
    }

    if (!graph[startNode]) {
        return { path: [], distance: Infinity, success: false, error: `"${startNode}" not found` };
    }

    if (!graph[endNode]) {
        return { path: [], distance: Infinity, success: false, error: `"${endNode}" not found` };
    }

    const distances = {};
    const previous = {};
    const unvisited = new Set();

    Object.keys(graph).forEach(node => {
        distances[node] = Infinity;
        previous[node] = null;
        unvisited.add(node);
    });

    distances[startNode] = 0;

    while (unvisited.size > 0) {
        let current = null;
        let smallestDistance = Infinity;

        for (let node of unvisited) {
            if (distances[node] < smallestDistance) {
                smallestDistance = distances[node];
                current = node;
            }
        }

        if (current === endNode) break;
        if (current === null || distances[current] === Infinity) break;

        unvisited.delete(current);

        const neighbors = graph[current];
        if (neighbors) {
            for (let neighbor in neighbors) {
                if (unvisited.has(neighbor)) {
                    const distance = distances[current] + neighbors[neighbor];
                    if (distance < distances[neighbor]) {
                        distances[neighbor] = distance;
                        previous[neighbor] = current;
                    }
                }
            }
        }
    }

    if (distances[endNode] === Infinity) {
        return { path: [], distance: Infinity, success: false, error: "No path exists" };
    }

    const path = [];
    let current = endNode;
    while (current) {
        path.unshift(current);
        current = previous[current];
    }

    return {
        path: path,
        distance: Math.round(distances[endNode]),
        success: true
    };
}

// Get estimated walking time (minutes) - average walking speed ~80m/min
export function getWalkingTime(distanceMeters) {
    return Math.ceil(distanceMeters / 80);
}

// Find nearest building to given coordinates
export function findNearestBuilding(lat, lng) {
    let nearest = null;
    let minDistance = Infinity;

    const buildingsWithCoords = venues.filter(v => v.position && v.position.length === 2);

    for (const building of buildingsWithCoords) {
        const distance = calculateDistance(lat, lng, building.position[0], building.position[1]);
        if (distance < minDistance) {
            minDistance = distance;
            nearest = building.name;
        }
    }

    return { building: nearest, distance: Math.round(minDistance) };
}