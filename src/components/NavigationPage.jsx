import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import logo from "../assets/images/University_of_Zimbabwe_LOGO.png";
import "./Map.css";
import { useState, useEffect, useRef } from "react";
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
    html: `<div style="width: 18px; height: 18px; background: #1a56db; border: 3px solid white; border-radius: 50%; box-shadow: 0 0 0 3px rgba(26,86,219,0.4);"></div>`,
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
        if (route.length > 1 && !hasFittedRef.current) {
            map.fitBounds(route, { padding: [50, 50] });
            hasFittedRef.current = true;
        }
    }, [route, map]);

    return null;
}

function MapFollower({ position, isFollowing, userInteracted }) {
    const map = useMap();
    const lastPositionRef = useRef(position);

    useEffect(() => {
        if (isFollowing && position && !userInteracted) {
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
    const hasSetInitialLocation = useRef(false);

    const { start, destination } = location.state || {};

    // Fetch route from OSRM
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

    // Watch live user location
    useEffect(() => {
        if (!navigator.geolocation) return;

        if (start && !hasSetInitialLocation.current) {
            setUserLocation(start);
            hasSetInitialLocation.current = true;
        }

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

        return () => {
            if (watchIdRef.current) {
                navigator.geolocation.clearWatch(watchIdRef.current);
            }
        };
    }, [start]);

    const handleMapMoveStart = () => {
        if (isFollowing) {
            setUserInteracted(true);
        }
    };

    const handleToggleFollow = () => {
        setIsFollowing(!isFollowing);
        if (!isFollowing) {
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
                        ← Back to Map
                    </button>

                    <h2>{destination.name}</h2>

                    {destination.isBuilding ? (
                        <>
                            <p className="venues-subtitle"> Venues inside this building:</p>
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
                                            Navigating to: {venue.name}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </>
                    ) : (
                        <p className="venue-location">
                            Located in: <strong>{destination.parentBuilding}</strong>
                        </p>
                    )}

                    {/* Follow me toggle */}
                    <div style={{ marginTop: "auto", paddingTop: "20px" }}>
                        <button
                            className="back-button"
                            style={{
                                background: isFollowing ? "#ffffff" : "transparent",
                                color: isFollowing ? "black" : "#cadfff",
                                marginTop: "10px",
                                transition: "all 0.3s"
                            }}
                            onClick={handleToggleFollow}
                        >
                            {isFollowing ? "🔵 Following You (ON)" : "⚪ Follow Me (OFF)"}
                        </button>
                        {userInteracted && isFollowing && (
                            <div style={{ fontSize: "11px", marginTop: "8px", color: "#000000", backgroundColor: "#ffffff" }}>
                                Tap "Follow Me" to re-center
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

                        {/* START POINT MARKER */}
                        {start && !userLocation && (
                            <Marker position={start}>
                                <Popup>Starting Point</Popup>
                            </Marker>
                        )}

                        {/* LIVE USER LOCATION */}
                        {userLocation && (
                            <Marker position={userLocation} icon={userLocationIcon}>
                                <Popup> You are here</Popup>
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

                        {/* FOLLOW USER */}
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