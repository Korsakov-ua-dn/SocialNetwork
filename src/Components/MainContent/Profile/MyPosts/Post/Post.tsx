import React from 'react';
import s from './Post.module.css';

type propsType = {
    message?: string
    photo: string | undefined
    likesCount: number
    id: number
}

const Post = (props: propsType) => {
    return (
        <div className={s.post}>
            <div className={s.ava} style={{background: `center / cover no-repeat url(${props.photo})`}} />
            <div>{props.message}</div>
            <span>Like</span> <span> {props.likesCount}</span>
        </div>
    )
}

export default Post;