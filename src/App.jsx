import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Map from "./components/Map";
import NavigationPage from "./components/NavigationPage";
import SplashScreen from "./components/SplashScreen";

function App() {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashFinish = () => {
    setShowSplash(false);
  };

  return (
    <>
      {showSplash && <SplashScreen onFinish={handleSplashFinish} />}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Map />} />
          <Route path="/navigation" element={<NavigationPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;