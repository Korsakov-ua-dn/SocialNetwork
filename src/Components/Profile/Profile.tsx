import React from 'react';
import s from './Profile.module.css';
import MyPosts from "./MyPosts/MyPosts";

const Profile = () => {
    return (
        <div className={s.content}>
            <div className={s.bg_img}/>
            <div className={s.personal_wrapper}>
                <div className={s.ava_img}/>
                <div>
                    <h3>Korsakov Oleg</h3>
                    <p>Samurai Level 1</p>
                    <p>sex: Male</p>
                    <p>city: Donetsk</p>
                </div>
            </div>
            <MyPosts/>
        </div>
    )
}

export default Profile;