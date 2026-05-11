import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase"; // adjust path if needed

const Pathways = () => {
  const [pathways, setPathways] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPathways = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "pathways"));

      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setPathways(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching pathways:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPathways();
  }, []);

  if (loading) {
    return <p>Loading pathways...</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Campus Pathways</h2>

      {pathways.length === 0 ? (
        <p>No pathways found.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {pathways.map((path) => (
            <li
              key={path.id}
              style={{
                marginBottom: "10px",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "8px",
              }}
            >
              <strong>{path.from}</strong> ➝ <strong>{path.to}</strong>
              <p>Distance: {path.distance} m</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Pathways;