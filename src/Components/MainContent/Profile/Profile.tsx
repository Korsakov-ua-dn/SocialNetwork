import React from 'react';
import s from './Profile.module.css';
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from './ProfileInfo/ProfileInfo'

import {PostType} from './../../../Redux/state';

type ProfilePropsType = {
    postsData: Array<PostType>
    addPost: (value: string)=>void
  }

const Profile = ({postsData, addPost}: ProfilePropsType) => {
   return (
        <div>
            <div className={s.bg_img}/>
            <ProfileInfo avatar="url('https://avatars.mds.yandex.net/get-zen_doc/1570751/pub_5fa2a2525dc59845ddab2eb2_5fa2a4ab5dfc942ad768ab44/scale_1200')"/>
            <MyPosts postsData={postsData} addPost={addPost}/>
        </div>
    )
}

export default Profile;