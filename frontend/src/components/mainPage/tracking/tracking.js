import "./tracking.css";
import { useEffect, useState } from 'react';

const Tracking = () => {
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

    function getTracking(posts) {
        let completed = 0;
        let inProgress = 0;
        for (let i = 0; i < posts.length; i++) {
            if (posts[i].status === "Done") {
                completed++;
            } else {
                inProgress++;
            }
        }
        return { completed, inProgress };
    }

    let tracking = getTracking(posts);

    if (err) {
        return <div>Error: {err.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <div className="tracking">
                <div className="tracking-title">
                    <h5>Assignments</h5>
                    <p>Week</p>
                </div>
                <div className="tracking-content">
                    <div className="tracking-content-completed">
                        <span>{tracking.completed}</span>
                        <p>Completed</p>
                    </div>
                    <div className="tracking-content-todo">
                        <span>{tracking.inProgress}</span>
                        <p>To do</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Tracking;