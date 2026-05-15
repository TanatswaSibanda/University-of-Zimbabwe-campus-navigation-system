import { useState, useEffect } from "react";
import logo from "../assets/images/University_of_Zimbabwe_LOGO.png";
import "./SplashScreen.css";

function SplashScreen({ onFinish }) {
    const [isFadingOut, setIsFadingOut] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsFadingOut(true);
            setTimeout(() => {
                onFinish();
            }, 600); // Duration matches CSS transition
        }, 3000);

        return () => clearTimeout(timer);
    }, [onFinish]);

    return (
        <div className={`splash-screen ${isFadingOut ? "fade-out" : ""}`}>
            <div className="splash-content">
                <img className="logo" src={logo} alt="University Logo" />

                <div className="title-group">
                    <h1 className="app-name">UNIVERSITY OF ZIMBABWE</h1>
                    <h2 className="univ-name">Campus Navigator</h2>
                </div>

                <div className="loader">
                    <div className="spinner"></div>
                </div>
            </div>
        </div>
    );
}

export default SplashScreen;