import React from 'react';
// import s from './MyPosts.module.css';
import Post from "./Post/Post";

export type postsDataPropsType = {
    postsData: Array<PostType>
}
type PostType = {
    id: number
    message: string
    likesCount: number
}

const MyPosts = ({postsData}: postsDataPropsType) => {

    let postItems = postsData.map( p => <Post id={p.id} message={p.message} likesCount={p.likesCount}/>)

    return (
        <div>
            <h3>My Posts</h3>
            <input type="text" placeholder='your news...'/>
            <button>Send</button>
            { postItems }
        </div>
    )
}

export default MyPosts;