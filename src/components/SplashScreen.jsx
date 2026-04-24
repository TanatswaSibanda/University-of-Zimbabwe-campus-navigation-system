import logo from "../assets/images/University_of_Zimbabwe_LOGO.png";
import travelIcon from "../assets/images/traveling.png";
import "./SplashScreen.css";

function SplashScreen() {
    return (
        <div className="splash-screen">

            <img className="logo" src={logo} alt="University Logo" />
            <div className="Title-Container">
                <div className="Title">
                    <h1>UNIVERSITY OF ZIMBABWE</h1>
                    <h1>CAMPUS NAVIGATOR</h1>
                </div>
                <img className="navigation-icon" src={travelIcon} alt="Navigation Icon" />
            </div>

        </div>
    );
}
export default SplashScreen;