import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import logo from "../assets/images/University_of_Zimbabwe_LOGO.png";
import "./Map.css";
import { useState, useEffect } from "react";
import PopularVenues from "./PopularVenues";
import venues from "./venues";
//import { loadAllBuildings } from "../services/firebaseService";
import { useNavigate } from "react-router-dom";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

function MapClickHandler({ onMapClick, isSelectingStart }) {
    useMapEvents({
        click(e) {
            if (isSelectingStart) {
                onMapClick([e.latlng.lat, e.latlng.lng]);
            }
        }
    });
    return null;
}

function CoordPicker() {
    const [coords, setCoords] = useState(null);
    useMapEvents({
        contextmenu(e) {
            setCoords([e.latlng.lat.toFixed(6), e.latlng.lng.toFixed(6)]);
        }
    });

    if (!coords) return null;

    return (
        <div
            style={{
                position: "absolute",
                bottom: "100px",
                left: "50%",
                transform: "translateX(-50%)",
                background: "white",
                padding: "8px 14px",
                borderRadius: "6px",
                zIndex: 1000,
                fontSize: "0.85rem",
                boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
                cursor: "pointer",
                color: "#0b2e83",
                fontWeight: 600,
            }}
            onClick={() => setCoords(null)}
        >
            📍 {coords[0]}, {coords[1]} &nbsp;✕
        </div>
    );
}

const btnStyle = {
    background: "white",
    border: "1px solid #ccc",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
    boxShadow: "0 1px 4px rgba(0,0,0,0.3)",
};

function PanControls() {
    const map = useMap();
    const panAmount = 150;

    const panMap = (direction) => {
        const offset = {
            up: [0, -panAmount],
            down: [0, panAmount],
            left: [-panAmount, 0],
            right: [panAmount, 0],
        };
        map.panBy(offset[direction]);
    };

    return (
        <div style={{
            position: "absolute",
            bottom: "30px",
            right: "55px",
            zIndex: 1000,
            display: "grid",
            gridTemplateColumns: "30px 30px 30px",
            gridTemplateRows: "30px 30px 30px",
            gap: "2px",
        }}>
            <div />
            <button onClick={() => panMap("up")} style={btnStyle}>▲</button>
            <div />
            <button onClick={() => panMap("left")} style={btnStyle}>◀</button>
            <div />
            <button onClick={() => panMap("right")} style={btnStyle}>▶</button>
            <div />
            <button onClick={() => panMap("down")} style={btnStyle}>▼</button>
            <div />
        </div>
    );
}

export default function Map() {
    const universityOfZimbabwe = [-17.7840, 31.0530];
    const [showPopup, setShowPopup] = useState(false);
    const [selectedVenue, setSelectedVenue] = useState(null);
    const [isSelectingStart, setIsSelectingStart] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchError, setSearchError] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [locationError, setLocationError] = useState("");
    const [locating, setLocating] = useState(false);
    const [showBuildingSelector, setShowBuildingSelector] = useState(false);
    const [selectedStartBuilding, setSelectedStartBuilding] = useState("");
    const [roomSearchQuery, setRoomSearchQuery] = useState("");
    const [roomSearchResults, setRoomSearchResults] = useState([]);
    const [showRoomResults, setShowRoomResults] = useState(false);
    const navigate = useNavigate();

    const handleVenueClick = (venueName, isVenueOnly = false, parentBuilding = null) => {
        // First try to find if it's a specific venue (room)
        let destination = null;

        if (isVenueOnly && parentBuilding) {
            // User selected a specific venue inside a building
            const building = venues.find(v => v.name === parentBuilding);
            if (building) {
                const venue = building.venues?.find(v => v.name === venueName);
                if (venue) {
                    destination = {
                        name: venue.name,
                        position: building.position,
                        isVenue: true,
                        parentBuilding: building.name,
                        building: building
                    };
                }
            }
        } else {
            // First try to find as a building
            let building = venues.find(v => v.name === venueName);
            if (building) {
                destination = {
                    name: building.name,
                    position: building.position,
                    isBuilding: true,
                    building: building
                };
            } else {
                // Then try to find as a venue inside any building
                for (const building of venues) {
                    const venue = building.venues?.find(v => v.name === venueName);
                    if (venue) {
                        destination = {
                            name: venue.name,
                            position: building.position,
                            isVenue: true,
                            parentBuilding: building.name,
                            building: building
                        };
                        break;
                    }
                }
            }
        }

        if (!destination) return;

        setSelectedVenue(destination);
        setShowPopup(true);
    };
    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchQuery(value);
        setSearchError("");

        if (value.trim() === "") {
            setSuggestions([]);
            setShowSuggestions(false);
            return;
        }

        const matches = [];

        // Search buildings
        venues.forEach((building) => {
            if (building.name.toLowerCase().includes(value.toLowerCase())) {
                matches.push({
                    name: building.name,
                    type: 'building',
                    building: building.name
                });
            }
            // Search venues inside building
            building.venues?.forEach((venue) => {
                if (venue.name.toLowerCase().includes(value.toLowerCase())) {
                    matches.push({
                        name: venue.name,
                        type: 'venue',
                        building: building.name,
                        parentBuilding: building.name
                    });
                }
            });
        });

        setSuggestions(matches);
        setShowSuggestions(matches.length > 0);
    };

    const handleSuggestionClick = (item, type, parentBuilding = null) => {
        setSearchQuery(item);
        setSuggestions([]);
        setShowSuggestions(false);
        setSearchError("");

        if (type === 'venue') {
            handleVenueClick(item, true, parentBuilding);
        } else {
            handleVenueClick(item);
        }
    };

    const handleSearch = () => {
        setSearchError("");
        setSuggestions([]);
        setShowSuggestions(false);

        if (searchQuery.trim() === "") {
            setSearchError("Please enter a building name to search.");
            return;
        }

        const match = venues.find((v) =>
            v.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        if (match) {
            handleVenueClick(match.name);
        } else {
            setSearchError(`No building found for "${searchQuery}"`);
        }
    };

    const handleUseCurrentLocation = () => {
        if (!navigator.geolocation) {
            setLocationError("Your browser does not support location tracking.");
            return;
        }

        setLocating(true);
        setLocationError("");

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const currentLocation = [
                    position.coords.latitude,
                    position.coords.longitude
                ];
                setLocating(false);
                setShowPopup(false);
                navigate("/navigation", {
                    state: { start: currentLocation, destination: selectedVenue }
                });
            },
            (error) => {
                setLocating(false);
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        setLocationError("Location access denied. Please allow location access in your browser settings and try again.");
                        break;
                    case error.POSITION_UNAVAILABLE:
                        setLocationError("Location unavailable. Please select a starting point manually instead.");
                        break;
                    case error.TIMEOUT:
                        setLocationError("Location request timed out. Please try again.");
                        break;
                    default:
                        setLocationError("Could not get your location. Please try again.");
                }
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
            }
        );
    };

    const handleSelectStartingPoint = () => {
        setShowPopup(false);
        setLocationError("");
        setShowBuildingSelector(true);
    };

    const handleBuildingSelect = (building) => {
        setShowBuildingSelector(false);
        setSelectedStartBuilding("");
        navigate("/navigation", {
            state: {
                start: building.position,
                destination: selectedVenue,
                startBuildingName: building.name
            }
        });
    };

    const handleMapClick = (coords) => {
        setIsSelectingStart(false);
        navigate("/navigation", {
            state: { start: coords, destination: selectedVenue }
        });
    };

    const handleRoomSearch = () => {
        if (!roomSearchQuery.trim()) {
            setRoomSearchResults([]);
            setShowRoomResults(false);
            return;
        }

        const results = [];
        venues.forEach(venue => {
            if (venue.rooms && venue.rooms.length > 0) {
                venue.rooms.forEach(room => {
                    if (room.name.toLowerCase().includes(roomSearchQuery.toLowerCase()) ||
                        (room.description && room.description.toLowerCase().includes(roomSearchQuery.toLowerCase()))) {
                        results.push({
                            building: venue.name,
                            buildingPosition: venue.position,
                            room: room,
                            venue: venue
                        });
                    }
                });
            }
        });

        setRoomSearchResults(results);
        setShowRoomResults(results.length > 0);

        if (results.length === 0 && roomSearchQuery.trim() !== "") {
            alert(`No room found matching "${roomSearchQuery}"`);
        }
    };

    const handleRoomResultClick = (result) => {
        setSelectedVenue({
            name: result.building,
            position: result.buildingPosition,
            room: result.room,
            venue: result.venue
        });
        setRoomSearchResults([]);
        setShowRoomResults(false);
        setRoomSearchQuery("");
        setShowPopup(true);
    };
    /*useEffect(() => {
        const loadBuildingsFromFirebase = async () => {
            const buildings = await loadAllBuildings();
            if (buildings.length > 0) {
                // Option 1: Use Firebase data instead of static venues
                console.log("Loaded buildings:", buildings);
                // You can merge with static data or replace entirely
            }
        };
        loadBuildingsFromFirebase();
    }, []);*/

    return (
        <div className="map-container">
            {/* HEADER */}
            <div className="header">
                <img src={logo} alt="University of Zimbabwe Logo" />
                <h2>University of Zimbabwe Campus Navigator</h2>
            </div>

            <div className="content-layout">
                <PopularVenues onVenueClick={handleVenueClick} />

                <div className="map-section">
                    {isSelectingStart && (
                        <div className="selecting-hint">
                            📍 Click anywhere on the map to set your starting point
                        </div>
                    )}

                    {/* SEARCH WRAPPER */}
                    <div className="search-wrapper">
                        {/* BUILDING SEARCH */}
                        <div className="search-container">
                            <input
                                className="search-bar"
                                type="text"
                                placeholder=" Search for a building e.g. Beit Hall"
                                value={searchQuery}
                                onChange={handleInputChange}
                                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                                onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                                onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
                                autoComplete="off"
                            />
                            <button className="search-button" onClick={handleSearch}>
                                Search
                            </button>
                        </div>

                        {showSuggestions && (
                            <div className="suggestions-dropdown">
                                {suggestions.map((venue, index) => (
                                    <div
                                        key={index}
                                        className="suggestion-item"
                                        onMouseDown={() => handleSuggestionClick(venue)}
                                    >
                                        🏛️ {venue.name}
                                    </div>
                                ))}
                            </div>
                        )}

                        {searchError && (
                            <div className="search-error">
                                ⚠️ {searchError}
                            </div>
                        )}

                        {/* ROOM SEARCH SECTION */}
                        <div className="room-search-section">
                            <div className="room-search-container">
                                <input
                                    className="room-search-bar"
                                    type="text"
                                    placeholder=" Search for a specific room (e.g., 'Chemistry Lab')"
                                    value={roomSearchQuery}
                                    onChange={(e) => setRoomSearchQuery(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && handleRoomSearch()}
                                    autoComplete="off"
                                />
                                <button className="room-search-button" onClick={handleRoomSearch}>
                                    Find Room
                                </button>
                            </div>

                            {showRoomResults && roomSearchResults.length > 0 && (
                                <div className="room-results-dropdown">
                                    <div className="room-results-header">
                                        <span>🎯 Found {roomSearchResults.length} room(s):</span>
                                        <button onClick={() => {
                                            setShowRoomResults(false);
                                            setRoomSearchResults([]);
                                        }}>✕</button>
                                    </div>
                                    {roomSearchResults.map((result, idx) => (
                                        <div
                                            key={idx}
                                            className="room-result-item"
                                            onClick={() => handleRoomResultClick(result)}
                                        >
                                            <div className="room-icon">🚪</div>
                                            <div className="room-info">
                                                <div className="room-name">{result.room.name}</div>
                                                <div className="room-building">📍 {result.building}</div>
                                                {result.room.description && (
                                                    <div className="room-description">{result.room.description}</div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* MAP */}
                    <MapContainer
                        center={universityOfZimbabwe}
                        zoom={17}
                        style={{ height: "450px", width: "100%" }}
                    >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution="© OpenStreetMap contributors"
                        />

                        {venues.map((venue, index) => (
                            <Marker key={index} position={venue.position}>
                                <Popup>
                                    <div className="venue-popup">
                                        <h3>{venue.name}</h3>
                                        {venue.rooms && venue.rooms.length > 0 && (
                                            <>
                                                <p><strong>📚 Rooms/Facilities:</strong></p>
                                                <ul className="rooms-list">
                                                    {venue.rooms.slice(0, 5).map((room, roomIndex) => (
                                                        <li key={roomIndex}>
                                                            <strong>{room.name}</strong>
                                                            {room.description && <span> - {room.description}</span>}
                                                        </li>
                                                    ))}
                                                    {venue.rooms.length > 5 && (
                                                        <li>+ {venue.rooms.length - 5} more...</li>
                                                    )}
                                                </ul>
                                            </>
                                        )}
                                    </div>
                                </Popup>
                            </Marker>
                        ))}

                        <Marker position={universityOfZimbabwe}>
                            <Popup>University of Zimbabwe<br />Main Campus</Popup>
                        </Marker>

                        <MapClickHandler
                            onMapClick={handleMapClick}
                            isSelectingStart={isSelectingStart}
                        />
                        <CoordPicker />
                        <PanControls />
                    </MapContainer>

                    {/* BUILDING SELECTOR MODAL */}
                    {showBuildingSelector && (
                        <div className="building-selector-overlay">
                            <div className="building-selector-modal">
                                <h3>🏛️ Select Starting Building</h3>
                                <p className="modal-subtitle">Choose a building to start navigation from</p>
                                <select
                                    className="building-dropdown"
                                    value={selectedStartBuilding}
                                    onChange={(e) => {
                                        const building = venues.find(v => v.name === e.target.value);
                                        if (building) handleBuildingSelect(building);
                                    }}
                                >
                                    <option value="">-- Choose a building --</option>
                                    {venues.map((venue, idx) => (
                                        <option key={idx} value={venue.name}>
                                            🏛️ {venue.name}
                                        </option>
                                    ))}
                                </select>
                                <button
                                    className="cancel-button"
                                    onClick={() => setShowBuildingSelector(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}

                    {/* NAVIGATION OPTION MODAL */}
                    {showPopup && selectedVenue && (
                        <div className="custom-popup">
                            <div className="popup-box">
                                <h3>📍 {selectedVenue.name}</h3>
                                {selectedVenue.room && (
                                    <div className="selected-room-info">
                                        <strong>Room: {selectedVenue.room.name}</strong>
                                        {selectedVenue.room.description && (
                                            <p>{selectedVenue.room.description}</p>
                                        )}
                                    </div>
                                )}
                                <h4>Select Navigation Option</h4>

                                <button
                                    className="nav-option-btn current-location"
                                    onClick={handleUseCurrentLocation}
                                    disabled={locating}
                                >
                                    {locating ? "⏳ Getting location..." : "📍 Use My Current Location"}
                                </button>

                                <button
                                    className="nav-option-btn select-start"
                                    onClick={handleSelectStartingPoint}
                                >
                                    🗺️ Select Starting Building
                                </button>

                                {locationError && (
                                    <div className="location-error">
                                        ⚠️ {locationError}
                                    </div>
                                )}

                                <button
                                    className="cancel-btn"
                                    onClick={() => {
                                        setShowPopup(false);
                                        setLocationError("");
                                        setSelectedVenue(null);
                                    }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}