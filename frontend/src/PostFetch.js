import React, { useState, useEffect } from 'react';


function deletePost(postid) {
  fetch('http://localhost:9999/posts/' + postid, {
    method: 'DELETE'
  })
    .then(() => {
      window.location.reload();
    })
}

const ListPost = ({ posts }) => {
  return (
    <div>
      <p>[</p>
      {posts && posts.map((post) => (
        <div key={post.id}>
          <pre>   &#123;</pre>
          <p class="userId">"userId": {post.userId},</p>
          <p class="id">"id": {post.id},</p>
          <p class="title">"title": {post.title},</p>
          <p class="body">"body": {post.body.split(/[||\n]+/).filter(Boolean)}</p>
          <pre>   &#125;,</pre>
          <button className = "button" onClick={() => deletePost(post.id)}>Delete</button>
        </div>
      ))}
      <p>]</p>
    </div>
  )
}

const PostFetch = () => {
  const [posts, setPosts] = useState(null)

  useEffect(() => {
    fetch('http://localhost:9999/posts')
      .then(res => {
        return res.json();
      })
      .then(resdata => {
        console.log(resdata)
        setPosts(resdata)
      })
  }, [])

  return (
    <div>
      {posts && <ListPost posts={posts} />}
    </div>
  );
}

export default PostFetch
