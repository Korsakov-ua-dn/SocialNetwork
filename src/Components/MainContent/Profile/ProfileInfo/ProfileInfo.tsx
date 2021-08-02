import React from 'react';
import s from './ProfileInfo.module.css';

type ProfileInfoPropsType ={ 
    avatar: string
    profile: any // need to fixed
}

const ProfileInfo = (props: ProfileInfoPropsType) => {

    const avatarStyle = {
        backgroundImage: props.avatar
    }

    return (
        <div className={s.personal_wrapper}>
            <div style={avatarStyle} className={s.ava_img}/>
            <div>
                <h3>Korsakov Oleg</h3>
                <p>Samurai Level 1</p>
                <p>sex: Male</p>
                <p>city: Donetsk</p>
            </div>
        </div>
    )
}

export default ProfileInfo;