import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  getDocs
} from "firebase/firestore";

import { db } from "../firebase";

function Buildings() {

  const [buildings, setBuildings] = useState([]);

  const [name, setName] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  // ADD BUILDING
  const addBuilding = async () => {

    if (!name || !latitude || !longitude) {
      alert("Please fill all fields");
      return;
    }

    try {

      await addDoc(collection(db, "buildings"), {
        name,
        latitude: Number(latitude),
        longitude: Number(longitude)
      });

      alert("Building added!");

      setName("");
      setLatitude("");
      setLongitude("");

      fetchBuildings();

    } catch (error) {
      console.error(error);
    }
  };

  // FETCH BUILDINGS
  const fetchBuildings = async () => {

    try {

      const querySnapshot = await getDocs(
        collection(db, "buildings")
      );

      const buildingList = [];

      querySnapshot.forEach((doc) => {
        buildingList.push({
          id: doc.id,
          ...doc.data()
        });
      });

      setBuildings(buildingList);

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchBuildings();
  }, []);

  return (
    <div>

      <h2>Buildings</h2>

      <input
        type="text"
        placeholder="Building Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="number"
        placeholder="Latitude"
        value={latitude}
        onChange={(e) => setLatitude(e.target.value)}
      />

      <input
        type="number"
        placeholder="Longitude"
        value={longitude}
        onChange={(e) => setLongitude(e.target.value)}
      />

      <button onClick={addBuilding}>
        Add Building
      </button>

      <hr />

      {buildings.map((building) => (
        <div key={building.id}>
          <h3>{building.name}</h3>

          <p>
            Latitude: {building.latitude}
          </p>

          <p>
            Longitude: {building.longitude}
          </p>
        </div>
      ))}

    </div>
  );
}

export default Buildings;