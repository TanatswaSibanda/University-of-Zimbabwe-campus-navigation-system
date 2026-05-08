import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import logo from "../assets/images/University_of_Zimbabwe_LOGO.png";
import "./Map.css";
import { useState } from "react";
import PopularVenues from "./PopularVenues";
import venues from "./venues";
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
            up:    [0, -panAmount],
            down:  [0,  panAmount],
            left:  [-panAmount, 0],
            right: [ panAmount, 0],
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
    const navigate = useNavigate();

    const handleVenueClick = (venueName) => {
        const destination = venues.find((v) => v.name === venueName);
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

        const matches = venues.filter((v) =>
            v.name.toLowerCase().includes(value.toLowerCase())
        );
        setSuggestions(matches);
        setShowSuggestions(matches.length > 0);
    };

    const handleSuggestionClick = (venue) => {
        setSearchQuery(venue.name);
        setSuggestions([]);
        setShowSuggestions(false);
        setSearchError("");
        handleVenueClick(venue.name);
    };

    const handleSearch = () => {
        setSearchError("");
        setSuggestions([]);
        setShowSuggestions(false);

        // Empty input check
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
        setIsSelectingStart(true);
    };

    const handleMapClick = (coords) => {
        setIsSelectingStart(false);
        navigate("/navigation", {
            state: { start: coords, destination: selectedVenue }
        });
    };

    return (
        <div className="map-container">
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

                    {/* SEARCH BAR + DROPDOWN */}
                    <div className="search-wrapper">
                        <div className="search-container">
                            <input
                                className="search-bar"
                                type="text"
                                placeholder="Search for a building e.g Beit Hall"
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
                    </div>

                    {/* MODAL */}
                    {showPopup && (
                        <div className="custom-popup">
                            <div className="popup-box">
                                <h3>Select Navigation Option</h3>

                                <button
                                    onClick={handleUseCurrentLocation}
                                    disabled={locating}
                                    style={{ opacity: locating ? 0.7 : 1 }}
                                >
                                    {locating ? "⏳ Getting location..." : "📍 Use Current Location"}
                                </button>

                                {locationError && (
                                    <div style={{
                                        background: "#fee2e2",
                                        color: "#991b1b",
                                        padding: "8px 10px",
                                        borderRadius: "6px",
                                        fontSize: "0.82rem",
                                        marginTop: "8px",
                                        textAlign: "left"
                                    }}>
                                        ⚠️ {locationError}
                                    </div>
                                )}

                                <button onClick={handleSelectStartingPoint}>
                                    🗺️ Select Starting Point
                                </button>

                                <button
                                    onClick={() => {
                                        setShowPopup(false);
                                        setLocationError("");
                                    }}
                                    style={{
                                        background: "transparent",
                                        color: "#666",
                                        border: "1px solid #ddd",
                                        marginTop: "6px"
                                    }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}

                    <MapContainer
                        center={universityOfZimbabwe}
                        zoom={17}
                        style={{ height: "100%", width: "100%" }}
                    >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution="© OpenStreetMap contributors"
                        />
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
                </div>
            </div>
        </div>
    );
}