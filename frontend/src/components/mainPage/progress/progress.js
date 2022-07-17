import "./progress.css";
import { useEffect, useState } from 'react';

const Progress = () => {
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
    
    if (err) {
        return <div>Error: {err.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <div className="progress">
                <div className="progress-title">
                    <h5>Assignments</h5>
                </div>
                <div className="progress-content">
                    <div className="progress-content-subject1">
                        <div className="progress-content-subject1-title">
                            <span>{posts[0].name}</span>
                            <div>
                                <span>{posts[0].progress}</span>
                            </div>
                        </div>
                        <div className="progress-content-subject1-container">
                            <div className="progress-content-subject1-container-bar" style={{width:posts[0].progress}}>
                            </div>
                        </div>
                    </div>
                    <div className="progress-content-subject2">
                        <div className="progress-content-subject2-title">
                            <span>{posts[1].name}</span>
                            <div>
                                <span>{posts[1].progress}</span>
                            </div>
                        </div>
                        <div className="progress-content-subject2-container">
                            <div className="progress-content-subject2-container-bar" style={{width:posts[1].progress}}>
                            </div>
                        </div>
                    </div>
                    <div className="progress-content-subject3">
                        <div className="progress-content-subject3-title" >
                            <span>{posts[2].name}</span>
                            <div>
                                <span>{posts[2].progress}</span>
                            </div>
                        </div>
                        <div className="progress-content-subject3-container">
                            <div className="progress-content-subject3-container-bar" style={{width:posts[2].progress}}>
                            </div>
                        </div>
                    </div>
                    <div className="progress-content-subject4">
                        <div className="progress-content-subject4-title">
                            <span>{posts[3].name}</span>
                            <div>
                                <span>{posts[3].progress}</span>
                            </div>
                        </div>
                        <div className="progress-content-subject4-container">
                            <div className="progress-content-subject4-container-bar" style={{width:posts[3].progress}}>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Progress;