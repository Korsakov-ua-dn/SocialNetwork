import React from 'react';
import s from './Post.module.css';

type propsType = {
    message?: string
    like: number
}

const Post = (props: propsType) => {
    return (
        <div className={s.post}>
            <img src="https://icon-library.com/images/no-user-image-icon/no-user-image-icon-0.jpg" alt=""/>
            <span>{props.message}</span> <span>Like</span> <span> {props.like}</span>
        </div>
    )
}

export default Post;