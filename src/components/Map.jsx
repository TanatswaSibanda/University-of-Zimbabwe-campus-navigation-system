import {
  MapContainer,
  TileLayer,
  Marker,
  Popup
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

import logo from "../assets/images/University_of_Zimbabwe_LOGO.png";

import "./Map.css";

import venues from "../data/venues";

export default function Map() {

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

      </MapContainer>

    </div>
  );
}