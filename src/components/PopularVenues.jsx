const popularPlaces = [
  "Admin Block",
  "Main Library",
  "Student Union",
  "Faculty of Science",
  "Faculty of Vet Science",
  "Computer Centre"
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