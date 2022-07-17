import { useState } from 'react';
const NewQuote = () => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [userId, setUserId] = useState("2");

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:9999/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: userId,
                title: title,
                body: body
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
                <label>User ID</label>
                <select required value={userId} onChange={(e) => setUserId(e.target.value)}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                </select>
                <label>Title</label>
                <input type="text" placeholder = "Title here" required value={title} onChange={(e) => setTitle(e.target.value)} />
                <label>Body</label>
                <textarea placeholder = "Body here" rows="4" cols="50" required value={body} onChange={(e) => setBody(e.target.value)}></textarea>
                <button>Add quote</button>
            </form>
        </div>
    );
};

export default NewQuote;