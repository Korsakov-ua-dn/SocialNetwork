import React from 'react';
import s from './Profile.module.css';
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from './ProfileInfo/ProfileInfo'

import {ProfilePageType, ActionTypes} from './../../../Redux/state';

type ProfilePropsType = {
    profilePage: ProfilePageType
    dispatch: (action: ActionTypes) => void
  }

const Profile = ({profilePage, dispatch}: ProfilePropsType) => {
   return (
        <div>
            <div className={s.bg_img}/>
            <ProfileInfo avatar="url('https://avatars.mds.yandex.net/get-zen_doc/1570751/pub_5fa2a2525dc59845ddab2eb2_5fa2a4ab5dfc942ad768ab44/scale_1200')"/>
            <MyPosts profilePage={profilePage} dispatch={dispatch}/>
        </div>
    )
}

export default Profile;