import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  Popup
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

import { dijkstra, graph } from "./shortestPath";

import logo from "../assets/images/University_of_Zimbabwe_LOGO.png";

import "./Map.css";

import venues from "../data/venues";




export default function Map() {

  const [startPoint, setStartPoint] = useState("");
  const [destination, setDestination] = useState("");
  const [route, setRoute] = useState([]);

  const coordinates = {
  "Admin Block": [-17.7841, 31.0535],
  "Main Library": [-17.7835, 31.0528],
  "Student Union": [-17.7829, 31.0540],
  "Computer Centre": [-17.7838, 31.0519],
};
 
  const handleDirections = () => {

  const shortestPath = dijkstra(
    graph,
    startPoint,
    destination
  );

  if (!shortestPath.length) {
    alert("No path found");
    return;
  }

  const routeCoordinates = shortestPath
  .map((location) => coordinates[location])
  .filter((coord) => coord !== undefined);
  

  setRoute(routeCoordinates);

  console.log(shortestPath);
};

  const universityOfZimbabwe = [-17.7816, 31.0544];

  return (

    <div className="map-container">

      {/* HEADER */}
      <div className="header">

        <img
          src={logo}
          alt="University of Zimbabwe Logo"
        />

        <h2>
          University of Zimbabwe Campus Navigator
        </h2>

      </div>

      {/* SEARCH */}
      <div className="search-container">

        <input
          className="search-bar"
          type="text"
          placeholder="Search for a building"
        />

        <button className="search-button">
          Search
        </button>

      </div>

      <div className="direction-panel">
  <h3>Directions</h3>

  <input
    type="text"
    placeholder="Starting Point"
    value={startPoint}
    onChange={(e) => setStartPoint(e.target.value)}
  />

  <input
    type="text"
    placeholder="Destination"
    value={destination}
    onChange={(e) => setDestination(e.target.value)}
  />

  <button onClick={handleDirections}>
    Get Directions
  </button>
</div>

      {/* MAP */}
      <MapContainer

        center={universityOfZimbabwe}
        zoom={16}
        style={{
          height: "400px",
          width: "100%"
        }}
      >

        {/* TILE LAYER */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap contributors"
        />

        {/* MARKERS */}
        {venues.map((venue, index) => (

          <Marker
            key={index}
            position={venue.position}
          >

            <Popup>

              <h3>{venue.name}</h3>

              {venue.rooms.map((room, roomIndex) => (

                <div key={roomIndex}>

                  <strong>
                    {room.name}
                  </strong>

                  <p>
                    {room.description}
                  </p>

                  <hr />

                </div>

              ))}

            </Popup>

          </Marker>

        ))}
       {route.length > 0 && (
  <Polyline positions={route} color="blue" />
)} 

      </MapContainer>

    </div>
  );
}