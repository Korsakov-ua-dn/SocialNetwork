import React from 'react'
import s from './Profile.module.css'
import MyPostsContainer from './MyPosts/MyPostsContainer'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import {ProfileContainerPropsType} from './ProfileContainer'

const Profile = (props: ProfileContainerPropsType) => {
    return (
        <div>
            <div className={s.bg_img}/>
            <ProfileInfo {...props}/>
            <MyPostsContainer/>
        </div>
    )
}

export default Profile;