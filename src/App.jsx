
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { useState } from "react";
import { db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";


import Map from "./components/Map";
import NavigationPage from "./components/NavigationPage";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Map />} />
        <Route path="/navigation" element={<NavigationPage />} />
      </Routes>
    </BrowserRouter>
  );
}

function App() {

  // BUILDING STATE
  const [buildingName, setBuildingName] = useState("");

  // ROUTE STATE
  const [routeName, setRouteName] = useState("");
  const [startPoint, setStartPoint] = useState("");
  const [endPoint, setEndPoint] = useState("");

  // PATHWAY STATE
  const [pathwayName, setPathwayName] = useState("");
  const [pathwayLocation, setPathwayLocation] = useState("");

  // ADD BUILDING
  const addBuilding = async () => {

    try {

      await addDoc(collection(db, "buildings"), {
        name: buildingName
      });

      alert("Building Added");

      setBuildingName("");

    } catch (error) {
      console.error(error);
    }
  };

  // ADD ROUTE
  const addRoute = async () => {

    try {

      await addDoc(collection(db, "routes"), {
        routeName: routeName,
        startPoint: startPoint,
        endPoint: endPoint
      });

      alert("Route Added");

      setRouteName("");
      setStartPoint("");
      setEndPoint("");

    } catch (error) {
      console.error(error);
    }
  };

  // ADD PATHWAY
  const addPathway = async () => {

    try {

      await addDoc(collection(db, "pathways"), {
        pathwayName: pathwayName,
        location: pathwayLocation
      });

      alert("Pathway Added");

      setPathwayName("");
      setPathwayLocation("");

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>

      <h1 style={{ color: "white" }}>
        UZ Campus Navigation System
      </h1>

      {/* MAP */}
      <div style={{ marginBottom: "30px" }}>
        <Map />
      </div>

      {/* BUILDING FORM */}
      <div
        style={{
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "10px",
          backgroundColor: "#f5f5f5",
          marginBottom: "20px"
        }}
      >

        <h2>Add Building</h2>

        <input
          type="text"
          placeholder="Building Name"
          value={buildingName}
          onChange={(e) => setBuildingName(e.target.value)}
          style={{
            padding: "10px",
            width: "300px"
          }}
        />

        <br /><br />

        <button
          onClick={addBuilding}
          style={{
            padding: "10px 20px"
          }}
        >
          Add Building
        </button>

      </div>

      {/* ROUTE FORM */}
      <div
        style={{
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "10px",
          backgroundColor: "#f5f5f5",
          marginBottom: "20px"
        }}
      >

        <h2>Add Route</h2>

        <input
          type="text"
          placeholder="Route Name"
          value={routeName}
          onChange={(e) => setRouteName(e.target.value)}
          style={{
            padding: "10px",
            width: "300px"
          }}
        />

        <br /><br />

        <input
          type="text"
          placeholder="Start Point"
          value={startPoint}
          onChange={(e) => setStartPoint(e.target.value)}
          style={{
            padding: "10px",
            width: "300px"
          }}
        />

        <br /><br />

        <input
          type="text"
          placeholder="End Point"
          value={endPoint}
          onChange={(e) => setEndPoint(e.target.value)}
          style={{
            padding: "10px",
            width: "300px"
          }}
        />

        <br /><br />

        <button
          onClick={addRoute}
          style={{
            padding: "10px 20px"
          }}
        >
          Add Route
        </button>

      </div>

      {/* PATHWAY FORM */}
      <div
        style={{
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "10px",
          backgroundColor: "#f5f5f5"
        }}
      >

        <h2>Add Pathway</h2>

        <input
          type="text"
          placeholder="Pathway Name"
          value={pathwayName}
          onChange={(e) => setPathwayName(e.target.value)}
          style={{
            padding: "10px",
            width: "300px"
          }}
        />

        <br /><br />

        <input
          type="text"
          placeholder="Location"
          value={pathwayLocation}
          onChange={(e) => setPathwayLocation(e.target.value)}
          style={{
            padding: "10px",
            width: "300px"
          }}
        />

        <br /><br />

        <button
          onClick={addPathway}
          style={{
            padding: "10px 20px"
          }}
        >
          Add Pathway
        </button>

      </div>

    </div>
  );
}

export default App;

