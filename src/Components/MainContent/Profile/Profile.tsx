import React from 'react';
import s from './Profile.module.css';
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import ProfileInfo from './ProfileInfo/ProfileInfo'

import {AppStoreType} from './../../../Redux/redux-store';

type ProfilePropsType = {
    store: AppStoreType
    // dispatch: (action: AppActionTypes) => void
  }

const Profile = ({store}: ProfilePropsType) => {
   return (
        <div>
            <div className={s.bg_img}/>
            <ProfileInfo avatar="url('https://avatars.mds.yandex.net/get-zen_doc/1570751/pub_5fa2a2525dc59845ddab2eb2_5fa2a4ab5dfc942ad768ab44/scale_1200')"/>
            <MyPostsContainer store={store}/>
        </div>
    )
}

export default Profile;