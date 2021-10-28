import React from 'react'
import s from './Profile.module.css'
import MyPostsContainer from './MyPosts/MyPostsContainer'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import {ProfileContainerPropsType} from './ProfileContainer'

export type AddPropsType = {
    isOwner: boolean
}

const Profile: React.FC<ProfileContainerPropsType & AddPropsType> = (props) => {
    return (
        <div>
            <div className={s.bg_img}/>
            <ProfileInfo {...props}/>
            <MyPostsContainer/>
        </div>
    )
}

export default Profile;