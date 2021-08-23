import React from 'react'
import Preloader from '../../../common/Preloader/Preloader'
import s from './ProfileInfo.module.css'
import ProfileStatus from './ProfileStatus'
import {ProfileType} from '../../../../Redux/profile-reducer'

type ProfileInfoPropsType = {
    profile: ProfileType | null
    status: string
    updateUserStatus: (status: string) => void
}

const ProfileInfo = (props: ProfileInfoPropsType) => {

    let photo;

    if (!props.profile) {
        return <Preloader isFetching/>
    } else {
        photo = props.profile.photos.large
        const avatarStyle = {
            backgroundImage: photo ? `url(${photo})` : "url('https://avatars.mds.yandex.net/get-zen_doc/1570751/pub_5fa2a2525dc59845ddab2eb2_5fa2a4ab5dfc942ad768ab44/scale_1200')"
        }

        return (
            <div className={s.personal_wrapper}>
                <div style={avatarStyle} className={s.ava_img}/>
                <div>
                    <h3>{props.profile.fullName}</h3>
                    <ProfileStatus status={props.status} updateUserStatus={props.updateUserStatus} />
                    <p>Samurai Level 1</p>
                    <p>{`aboutMe: ${props.profile.aboutMe}`}</p>
                    <p>city: Donetsk</p>
                </div>
            </div>
        )
    }
}

export default ProfileInfo;