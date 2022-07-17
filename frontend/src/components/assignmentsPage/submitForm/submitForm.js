import { useState } from 'react';

const SubmitForm = () => {
    const [name, setName] = useState("");
    const [deadline, setDeadline] = useState("");
    const [status, setStatus] = useState("Not done");
    const [progress, setProgress] = useState("0");
    const [description, setDescription] = useState("");

    const handleSubmit = (e) => {
        let date = new Date(deadline);
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let hour = date.getHours();
        let minute = date.getMinutes();
        if (month < 10) {
            month = "0" + month;
        }
        if (day < 10) {
            day = "0" + day;
        }
        if (hour < 10) {
            hour = "0" + hour;
        }
        
        if (minute < 10) {
            minute = "0" + minute;
        }
        
        e.preventDefault();
        fetch('http://localhost:9999/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                deadline: deadline,
                year: year,
                month: month,
                day: day,
                hour: hour,
                minute: minute,
                status: status,
                progress: progress + "%",
                description: description
            })
        }).then(() => {
            console.log('Successfully added a new quote!');
        }).catch(err => {
            console.log(err);
        })
    };

    return (
        <div className="info">
            <h2>Add a new quote</h2>
            <form onSubmit={handleSubmit}>
                <label>Subject name</label>
                <input type="text" placeholder = "Input subject name" required value={name} onChange={(e) => setName(e.target.value)} />
                <label>Status</label>
                <select required value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="Done">Done</option>
                    <option value="Not Done">Not Done</option>
                </select>
                <label>Progress</label>
                <input type="number" min="0" max="100" placeholder = "Input progress percentage" required value={progress} onChange={(e) => setProgress(e.target.value)} />
                <label>Deadline</label>
                <input type="datetime-local" required value={deadline} onChange={(e) => setDeadline(e.target.value)} />
                <label>Note</label>
                <textarea placeholder = "Body here" rows="4" cols="50" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                <button>Add assignment</button>
            </form>
        </div>
    );
};

export default SubmitForm;