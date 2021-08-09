import React from 'react';
import s from './Post.module.css';

type propsType = {
    message?: string
    likesCount: number
    id: number
}

const Post = (props: propsType) => {
    return (
        <div className={s.post}>
            <img
                src="https://avatars.mds.yandex.net/get-zen_doc/1570751/pub_5fa2a2525dc59845ddab2eb2_5fa2a4ab5dfc942ad768ab44/scale_1200"
                alt=""/>
            <span>{props.message}</span> <span>Like</span> <span> {props.likesCount}</span>
        </div>
    )
}

export default Post;