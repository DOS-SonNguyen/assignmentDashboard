import "./reminder.css";
import { useEffect, useState } from 'react';

const Reminder = () => {
    const [posts, setPosts] = useState([]);
    let [isLoaded, setIsLoaded] = useState(false);
    let [err, setErr] = useState(null);

    useEffect(() => {
        const getData = () => {
            fetch('http://localhost:9999/posts')
                .then(res => {
                    if (res.status >= 400) {
                        throw new Error("Server responds with error");
                    }
                    return res.json();
                })
                .then(resdata => {
                    setIsLoaded(true);
                    setPosts(resdata);
                }, err => {
                    setErr(err);
                    setIsLoaded(true);
                })
        };
        getData()
    }, [])

    function getTime(posts) {
        let dateNow = new Date();
        let min = Number.MAX_VALUE;
        for (let i = 0; i < posts.length; i++) {
            let date = new Date(posts[i].deadline);
            let seconds = Math.floor((date - dateNow) / 1000);
            let minutes = Math.floor(seconds / 60);
            if (minutes < min) {
                min = minutes;
            }
        }
        let hours = Math.floor(min / 60);
        let days = Math.floor(hours / 24);

        hours = hours - days * 24;
        let minutes = min - days * 24 * 60 - hours * 60;
        return [days, hours, minutes];
    }

    let [day, hour, minute] = getTime(posts);

    if (err) {
        return <div>Error: {err.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <div className="reminder">
                <div className="reminder-title">
                    <p>Please finish your assignment</p>
                </div>
                <div className="reminder-time">
                    <div className="reminder-time-day">
                        <div>
                            <span>{Math.floor(day / 10)}</span>
                            <span>{day % 10}</span>
                        </div>
                        <p>days</p>
                    </div>
                    <div className="reminder-time-hour">
                        <div>
                            <span>{Math.floor(hour / 10)}</span>
                            <span>{hour % 10}</span>
                        </div>
                        <p>hours</p>
                    </div>
                    <div className="reminder-time-minute">
                        <div>
                            <span>{Math.floor(minute / 10)}</span>
                            <span>{minute % 10}</span>
                        </div>
                        <p>minutes</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Reminder;