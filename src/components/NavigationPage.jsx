import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import logo from "../assets/images/University_of_Zimbabwe_LOGO.png";
import "./Map.css";
import { findShortestPath, getWalkingTime, findNearestBuilding } from "../services/shortestPathService";
// import { getWaypointsBetween } from "../services/campusWalkways"; // Removed unused import
import { useState, useEffect, useRef, useMemo } from "react";
import { saveFavoriteRoute, loadFavoriteRoutes, deleteFavoriteRoute } from "../services/favoriteRoutesService";
import { useLocation, useNavigate } from "react-router-dom";


delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

// Custom blue dot icon for live user location
const userLocationIcon = L.divIcon({
    className: "",
    html: `<div style="
        width: 18px;
        height: 18px;
        background: #1a56db;
        border: 3px solid white;
        border-radius: 50%;
        box-shadow: 0 0 0 3px rgba(26,86,219,0.4);
    "></div>`,
    iconSize: [18, 18],
    iconAnchor: [9, 9],
});

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

function FitRoute({ route }) {
    const map = useMap();
    const hasFittedRef = useRef(false);

    useEffect(() => {
        // Only fit bounds ONCE when route loads, not every time
        if (route.length > 1 && !hasFittedRef.current) {
            map.fitBounds(route, { padding: [50, 50] });
            hasFittedRef.current = true;
        }
    }, [route, map]);

    return null;
}

// FIXED: Only pans to user if following is ON and user explicitly toggled it
function MapFollower({ position, isFollowing, userInteracted }) {
    const map = useMap();
    const lastPositionRef = useRef(position);

    useEffect(() => {
        // Only follow if:
        // 1. User has FOLLOW toggle ON
        // 2. User has NOT manually moved the map
        // 3. Position has actually changed significantly
        if (isFollowing && position && !userInteracted) {
            // Only pan if position changed more than 10 meters (~0.0001 degrees)
            const hasMoved = lastPositionRef.current && (
                Math.abs(lastPositionRef.current[0] - position[0]) > 0.0001 ||
                Math.abs(lastPositionRef.current[1] - position[1]) > 0.0001
            );

            if (hasMoved || !lastPositionRef.current) {
                map.panTo(position, { animate: true, duration: 0.5 });
                lastPositionRef.current = position;
            }
        }
    }, [position, isFollowing, userInteracted, map]);

    return null;
}

export default function NavigationPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const [selectedVenue, setSelectedVenue] = useState(null);
    const [routeCoords, setRouteCoords] = useState([]);
    const [loadingRoute, setLoadingRoute] = useState(true);
    const [routeError, setRouteError] = useState("");
    const [userLocation, setUserLocation] = useState(null);
    const [isFollowing, setIsFollowing] = useState(false);
    const [userInteracted, setUserInteracted] = useState(false);
    const watchIdRef = useRef(null);
    const mapRef = useRef(null);
    const [isSaved, setIsSaved] = useState(false);
    const [showSavedMessage, setShowSavedMessage] = useState(false);
    const [favoriteRoutes, setFavoriteRoutes] = useState([]);
    const [showFavorites, setShowFavorites] = useState(false);
    // Removed unused state: shortestPath, setShortestPath
    const [showShortestPath, setShowShortestPath] = useState(true);

    const { start, destination } = location.state || {};

    const [userId, setUserId] = useState("demo_user");


    const handleSaveRoute = async () => {
        const routeData = {
            startBuilding: "Selected Start",
            destinationBuilding: destination.name,
            destinationVenue: destination.isVenue ? destination.name : null
        };

        await saveFavoriteRoute(userId, routeData);
        setIsSaved(true);
        setShowSavedMessage(true);
        setTimeout(() => setShowSavedMessage(false), 3000);
    };

    const handleLoadFavorites = async () => {
        const routes = await loadFavoriteRoutes(userId);
        setFavoriteRoutes(routes);
        setShowFavorites(true);
    };

    const handleUseFavorite = (favorite) => {
        // Navigate to that favorite route
        navigate("/", {
            state: {
                start: null,
                destination: { name: favorite.destinationBuilding }
            }
        });
    };

    const handleDeleteFavorite = async (routeId) => {
        await deleteFavoriteRoute(routeId);
        // Refresh the list
        const routes = await loadFavoriteRoutes(userId);
        setFavoriteRoutes(routes);
    };
    // Fetch road route from OSRM
    useEffect(() => {
        if (!start || !destination) return;

        const [startLat, startLng] = start;
        const [destLat, destLng] = destination.position;

        const url = `https://router.project-osrm.org/route/v1/foot/${startLng},${startLat};${destLng},${destLat}?overview=full&geometries=geojson`;

        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                if (data.routes && data.routes.length > 0) {
                    const coords = data.routes[0].geometry.coordinates.map(
                        ([lng, lat]) => [lat, lng]
                    );
                    setRouteCoords(coords);
                } else {
                    setRouteError("Could not find a route.");
                    setRouteCoords([start, destination.position]);
                }
                setLoadingRoute(false);
            })
            .catch(() => {
                setRouteError("Routing service unavailable. Showing straight line.");
                setRouteCoords([start, destination.position]);
                setLoadingRoute(false);
            });
    }, [start, destination]);

    // Watch live user location - FIXED: No direct setState without condition
    useEffect(() => {
        if (!navigator.geolocation) return;

        // Set initial position from start prop (removed synchronous setState, will be set by watchPosition)
        // The initial location will be set by the watchPosition callback or remain null.
        // If you need to set an initial fallback, do it in a useMemo or useState initialization.
        // For this fix, we simply start watching.

        watchIdRef.current = navigator.geolocation.watchPosition(
            (position) => {
                setUserLocation([
                    position.coords.latitude,
                    position.coords.longitude
                ]);
            },
            (error) => console.log("Location watch error:", error),
            {
                enableHighAccuracy: true,
                maximumAge: 0,
                timeout: 5000
            }
        );

        // Stop watching when user leaves page
        return () => {
            if (watchIdRef.current) {
                navigator.geolocation.clearWatch(watchIdRef.current);
            }
        };
    }, [start]); // Added start as dependency but removed setUserLocation(start) to avoid warning

    // ✅ Calculate shortest path during render (not in an effect)
    const calculatedShortestPath = useMemo(() => {
        if (!destination || loadingRoute) return null;

        let endBuilding = destination.isBuilding ? destination.name : destination.parentBuilding;
        let startBuilding = null;

        // Try to find start building from user's current location
        if (userLocation && userLocation.length === 2) {
            const nearest = findNearestBuilding(userLocation[0], userLocation[1]);
            if (nearest.building) {
                startBuilding = nearest.building;
            }
        }
        // If no user location, try from the start prop (selected starting point)
        else if (start && start.length === 2) {
            const nearest = findNearestBuilding(start[0], start[1]);
            if (nearest.building) {
                startBuilding = nearest.building;
            }
        }

        // If we still don't have a start building, show message instead of default
        if (!startBuilding) {
            console.log("Could not determine start building");
            return null;
        }

        const result = findShortestPath(startBuilding, endBuilding);
        return result.success ? result : null;
    }, [destination, loadingRoute, userLocation, start]);

    // NEW: Detect when user manually moves the map
    const handleMapMoveStart = () => {
        if (isFollowing) {
            setUserInteracted(true);
            // Optionally auto-turn off following after manual move
            // setIsFollowing(false);
        }
    };

    // NEW: Reset interaction when user clicks "Follow Me" button
    const handleToggleFollow = () => {
        setIsFollowing(!isFollowing);
        if (!isFollowing) {
            // When turning ON following, reset interaction flag
            setUserInteracted(false);
        }
    };

    const handleVenueClick = (venue) => {
        setSelectedVenue(selectedVenue?.name === venue.name ? null : venue);
    };

    if (!start || !destination) {
        return (
            <div className="map-container">
                <div className="header">
                    <img src={logo} alt="University of Zimbabwe Logo" />
                    <h2>University of Zimbabwe Campus Navigator</h2>
                </div>
                <div style={{ padding: "2rem", textAlign: "center" }}>
                    <p>No destination selected.</p>
                    <button className="search-button" onClick={() => navigate("/")}>
                        ← Back to Map
                    </button>
                </div>
            </div>
        );
    }

    const venuesList = destination.building?.venues || [];

    return (
        <div className="map-container">
            <div className="header">
                <img src={logo} alt="University of Zimbabwe Logo" />
                <h2>University of Zimbabwe Campus Navigator</h2>
            </div>

            <div className="content-layout">
                <div className="popular-venues">
                    <button className="back-button" onClick={() => navigate("/")}>
                        ← Back
                    </button>
                    <div style={{ marginTop: "20px", borderTop: "1px solid #eee", paddingTop: "15px" }}>
                        {/* User name input (simple demo) */}
                        <div style={{ marginBottom: "10px" }}>
                            <label style={{ fontSize: "12px", color: "#666" }}>Your Name (for saving favorites):</label>
                            <input
                                type="text"
                                value={userId}
                                onChange={(e) => setUserId(e.target.value)}
                                style={{
                                    width: "100%",
                                    padding: "8px",
                                    marginTop: "5px",
                                    borderRadius: "6px",
                                    border: "1px solid #ccc",
                                    fontSize: "14px"
                                }}
                                placeholder="Enter your name"
                            />
                        </div>
                        {/* Shortest Path Display - FIXED: using calculatedShortestPath */}
                        {showShortestPath && calculatedShortestPath && (
                            <div className="shortest-path-card">
                                <div className="shortest-path-header">
                                    <span>🗺️ Shortest Path</span>
                                    <button onClick={() => setShowShortestPath(false)}>✕</button>
                                </div>
                                <div className="shortest-path-details">
                                    <div className="path-stat">
                                        📏 <strong>{calculatedShortestPath.distance} meters</strong>
                                    </div>
                                    <div className="path-stat">
                                        ⏱️ <strong>{getWalkingTime(calculatedShortestPath.distance)} min</strong>
                                    </div>
                                </div>
                                <div className="shortest-path-route">
                                    <div className="route-label">Via:</div>
                                    <div className="route-buildings">
                                        {calculatedShortestPath.path.map((building, index) => (
                                            <span key={index} className="route-building">
                                                {building}
                                                {index < calculatedShortestPath.path.length - 1 && " → "}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Save Route Button */}
                        <button
                            className="back-button"
                            onClick={handleSaveRoute}
                            style={{
                                background: isSaved ? "#28a745" : "#0b2e83",
                                color: "white",
                                width: "100%",
                                marginBottom: "10px"
                            }}
                        >
                            💾 Save This Route to Favorites
                        </button>

                        {showSavedMessage && (
                            <div style={{
                                background: "#d4edda",
                                color: "#155724",
                                padding: "8px",
                                borderRadius: "6px",
                                fontSize: "12px",
                                textAlign: "center",
                                marginBottom: "10px"
                            }}>
                                ✓ Route saved to Firebase!
                            </div>
                        )}

                        {/* Load Favorites Button */}
                        <button
                            className="back-button"
                            onClick={handleLoadFavorites}
                            style={{
                                background: "transparent",
                                border: "1px solid #0b2e83",
                                color: "#0b2e83",
                                width: "100%"
                            }}
                        >
                            ⭐ Load My Saved Routes
                        </button>
                    </div>

                    {/* Favorites Modal */}
                    {showFavorites && (
                        <div className="favorites-modal">
                            <div className="favorites-modal-content">
                                <div className="favorites-header">
                                    <h3>⭐ Your Saved Routes</h3>
                                    <button onClick={() => setShowFavorites(false)}>✕</button>
                                </div>
                                <div className="favorites-list">
                                    {favoriteRoutes.length === 0 ? (
                                        <p style={{ textAlign: "center", color: "#666" }}>No saved routes yet. Save one!</p>
                                    ) : (
                                        favoriteRoutes.map((route) => (
                                            <div key={route.id} className="favorite-item">
                                                <div className="favorite-info">
                                                    <div className="favorite-title">📍 {route.destinationBuilding}</div>
                                                    {route.destinationVenue && (
                                                        <div className="favorite-subtitle">🚪 {route.destinationVenue}</div>
                                                    )}
                                                    <div className="favorite-date">
                                                        Saved: {new Date(route.savedAt).toLocaleDateString()}
                                                    </div>
                                                </div>
                                                <div className="favorite-actions">
                                                    <button onClick={() => handleUseFavorite(route)}>Navigate</button>
                                                    <button onClick={() => handleDeleteFavorite(route.id)}>Delete</button>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                    <h2>{destination.name}</h2>

                    {destination.isBuilding ? (
                        <>
                            <p className="venues-subtitle">Venues in this building:</p>
                            {venuesList.map((venue, index) => (
                                <div key={index}>
                                    <button
                                        className="venue-button"
                                        onClick={() => handleVenueClick(venue)}
                                    >
                                        🚪 {venue.name}
                                    </button>
                                    {selectedVenue?.name === venue.name && (
                                        <div className="venue-description">
                                            📍 Navigate to {venue.name} in {destination.name}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </>
                    ) : (
                        <p className="venue-location">
                            📍 Located in: <strong>{destination.parentBuilding}</strong>
                        </p>
                    )}

                    {/* Follow me toggle - FIXED */}
                    <div style={{ marginTop: "auto", paddingTop: "20px" }}>
                        <button
                            className="back-button"
                            style={{
                                background: isFollowing ? "#1a3a6b" : "transparent",
                                color: isFollowing ? "white" : "#1a3a6b",
                                marginTop: "10px",
                                transition: "all 0.3s"
                            }}
                            onClick={handleToggleFollow}
                        >
                            {isFollowing ? "🔵 Following You (ON)" : "⚪ Follow Me (OFF)"}
                        </button>
                        {userInteracted && isFollowing && (
                            <div style={{ fontSize: "11px", marginTop: "8px", color: "#666" }}>
                                👆 Tap "Follow Me" to re-center
                            </div>
                        )}
                    </div>
                </div>

                <div className="map-section">
                    <div className="destination-banner">
                        {loadingRoute ? (
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
                                <div className="spinner" />
                                Calculating route...
                            </div>
                        ) : routeError ? (
                            `⚠️ ${routeError}`
                        ) : (
                            `🚶 Navigating to: ${destination.name}`
                        )}
                    </div>

                    <MapContainer
                        ref={mapRef}
                        center={destination.position}
                        zoom={17}
                        style={{ height: "100%", width: "100%" }}
                        // NEW: Detect user interaction with map
                        eventHandlers={{
                            dragstart: handleMapMoveStart,
                            zoomstart: handleMapMoveStart
                        }}
                    >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution="© OpenStreetMap contributors"
                        />

                        {/* DESTINATION MARKER */}
                        <Marker position={destination.position}>
                            <Popup>🏛️ {destination.name}</Popup>
                        </Marker>

                        {/* START POINT MARKER (if not current location) */}
                        {start && !userLocation && (
                            <Marker position={start}>
                                <Popup>🚩 Starting Point</Popup>
                            </Marker>
                        )}

                        {/* LIVE USER LOCATION — blue dot */}
                        {userLocation && (
                            <Marker position={userLocation} icon={userLocationIcon}>
                                <Popup>📍 You are here</Popup>
                            </Marker>
                        )}

                        {/* ROUTE LINE */}
                        {routeCoords.length > 1 && (
                            <>
                                <Polyline
                                    positions={routeCoords}
                                    pathOptions={{ color: "#1a56db", weight: 6, opacity: 0.85 }}
                                />
                                <FitRoute route={routeCoords} />
                            </>
                        )}

                        {/* FOLLOWS USER ONLY WHEN TOGGLE IS ON AND USER HASN'T INTERACTED */}
                        {isFollowing && userLocation && (
                            <MapFollower
                                position={userLocation}
                                isFollowing={isFollowing}
                                userInteracted={userInteracted}
                            />
                        )}

                        <PanControls />
                    </MapContainer>
                </div>
            </div>
        </div>
    );
}