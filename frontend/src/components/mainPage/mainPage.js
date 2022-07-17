import gearIcon from "../../icon/gear-solid.svg"
import bellIcon from "../../icon/bell-solid.svg"
import userIcon from '../../icon/user.png'
import Reminder from "./reminder/reminder";
import Tracking from "./tracking/tracking";
import Note from "./note/note";
import Progress from "./progress/progress";
import Calendar from "./calendar/calendar";

import "./mainPage.css"

const MainPage = () => {
    return (
        <div className="mainPage">
            <div className="header">
                <div className="header-left">
                    <h3>Hello Son, Welcome back</h3>
                    <h1>Your Assignment Dashboard</h1>
                </div>
                <div className="header-right">
                    <img src={bellIcon} alt="bell icon" className="bellIcon"></img>
                    <img src={gearIcon} alt="gear icon" className="gearIcon"></img>
                    <img src={userIcon} alt="user icon" className="userIcon"></img>
                </div>
            </div>
            <Reminder />
            <Tracking />
            <Note />
            <Progress />
            <Calendar />
        </div>

    );
}

export default MainPage;