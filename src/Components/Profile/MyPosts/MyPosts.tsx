import React from 'react';
// import s from './MyPosts.module.css';
import Post from "./Post/Post";

const MyPosts = () => {
    return (
        <div>
            <h3>My Posts</h3>
            <input type="text" placeholder='your news...'/>
            <button>Send</button>
            <Post message="Hey, how are your samurai way?" like={13}/>
            <Post message="Do not lose hope!" like={0}/>
        </div>
    )
}

export default MyPosts;