// src/components/PopularVenues.jsx

const popularPlaces = [
  "Main Library",
  "Great Hall",
  "CBZ Bank",
  "Sports Pavilion",
  "Student's Union Building",
  "Beit Hall",
  "Faculty of Science",
  "Diamond Lecture Theatre",
  "Administration Block",
  "NLT 500",
  "Social Sciences Department",
  "Faculty of Engineering",
  "Computer Science",
  "UZ Computer Centre"
];

function PopularVenues({
  onVenueClick,
  onFindNearby,
  showNearby,
  setShowNearby,
  nearbyBuildings,
  isLocatingNearby
}) {
  return (
    <div className="popular-venues">
      {/* Nearby Buildings Button */}
      <button
        className="nearby-btn"
        onClick={onFindNearby}
        disabled={isLocatingNearby}
      >
        {isLocatingNearby ? " Finding your location..." : " Find Nearby Buildings"}
      </button>

      {/* Nearby Buildings List */}
      {showNearby && nearbyBuildings && nearbyBuildings.length > 0 && (
        <div className="nearby-section">
          <div className="nearby-header">
            <span> Nearby Buildings</span>
            <button onClick={() => setShowNearby(false)}>✕</button>
          </div>
          <div className="nearby-list">
            {nearbyBuildings.map((building, idx) => (
              <button
                key={idx}
                className="nearby-item"
                onClick={() => onVenueClick(building.name)}
              >
                <span className="nearby-name">🏛️ {building.name}</span>
                <span className="nearby-distance">{building.distance}m away</span>
              </button>
            ))}
          </div>
        </div>
      )}

      <h3> Popular Venues</h3>
      <div className="popular-venues-list">
        {popularPlaces.map((place) => (
          <button
            key={place}
            className="venue-btn"
            onClick={() => onVenueClick(place)}
          >
            {place}
          </button>
        ))}
      </div>
    </div>
  );
}

export default PopularVenues;