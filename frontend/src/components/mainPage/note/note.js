import "./note.css";
import { useEffect, useState } from 'react';

const Note = () => {

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
                    console.log(resdata);
                    setIsLoaded(true);
                    setPosts(resdata);
                }, err => {
                    setErr(err);
                    setIsLoaded(true);
                })
        };
        getData()
    }, [])

    function getMinIndex(posts) {
        let dateNow = new Date();
        let min = Number.MAX_VALUE;
        let index = 0;
        for (let i = 0; i < posts.length; i++) {
            let date = new Date(posts[i].deadline);
            let seconds = Math.floor((date - dateNow) / 1000);
            let minutes = Math.floor(seconds / 60);
            if (minutes < min) {
                min = minutes;
                index = i;
            }
            return index;
        }
    }

    let minIndex = getMinIndex(posts);

    if (err) {
        return <div>Error: {err.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <div className="note">
                <div className="note-title">
                    <span>{posts[minIndex].name}</span>
                    <div className="note-title-date">
                        ~ <span>{posts[minIndex].hour}</span>:<span>{posts[minIndex].minute}</span> <span>{posts[minIndex].month}</span>/<span>{posts[minIndex].day}</span>
                    </div>
                </div>
                <hr />
                <div className="note-content">
                    <h5>Note</h5>
                    <p>{posts[minIndex].description}</p>
                </div>
            </div>
        )
    }
}
export default Note;