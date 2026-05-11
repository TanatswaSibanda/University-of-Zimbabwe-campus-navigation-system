import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

function Routes() {

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [distance, setDistance] = useState("");
  const [time, setTime] = useState("");

  // ADD ROUTE
  const addRoute = async () => {

    try {

      await addDoc(collection(db, "routes"), {

        from: from,
        to: to,
        distance: distance,
        estimatedTime: time

      });

      alert("Route Added");

      setFrom("");
      setTo("");
      setDistance("");
      setTime("");

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>

      <h2>Add Route</h2>

      {/* FROM BUILDING */}
      <input
        type="text"
        placeholder="From Building"
        value={from}
        onChange={(e) => setFrom(e.target.value)}
      />

      <br /><br />

      {/* TO BUILDING */}
      <input
        type="text"
        placeholder="To Building"
        value={to}
        onChange={(e) => setTo(e.target.value)}
      />

      <br /><br />

      {/* DISTANCE */}
      <input
        type="text"
        placeholder="Distance (e.g 500m)"
        value={distance}
        onChange={(e) => setDistance(e.target.value)}
      />

      <br /><br />

      {/* TIME */}
      <input
        type="text"
        placeholder="Estimated Time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />

      <br /><br />

      <button onClick={addRoute}>
        Add Route
      </button>

    </div>
  );
}

export default Routes;