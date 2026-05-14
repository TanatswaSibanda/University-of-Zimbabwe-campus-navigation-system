const popularPlaces = [
  "Administration Block",
  "Main Library",
  "Great Hall",
  "CBZ Bank",
  "Sports Pavilion",
  "Student's Union Building",
  "Beit Hall",
  "Faculty of Science",
  "Diamond Lecture Theatre",



];

function PopularVenues({ onVenueClick }) {
  return (
    <div className="popular-venues">
      <h3>Popular Venues</h3>
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
  );
}

export default PopularVenues;