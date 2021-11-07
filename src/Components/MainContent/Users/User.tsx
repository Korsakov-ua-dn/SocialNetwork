import s from './User.module.css'
import avatar from '../../../assets/img/null-avatar-icon.png'
import {NavLink} from 'react-router-dom'
import {UserDataType} from "../../../API/api"
import React from "react"

type UsersPropsType = {
    user: UserDataType
    isFollowingProgress: number[]
    follow: (userId: number) => void
    unfollow: (userId: number) => void
}

const User: React.FC<UsersPropsType> = (
    {
        user,
        isFollowingProgress,
        follow,
        unfollow,
    }
) => {

    return (
        <div className={s.userWrapper}>
            <div className={s.dataWrapper}>
                <div className={s.avatar}>
                    <NavLink to={"/profile/" + user.id}>
                        <img src={user.photos.small ? user.photos.small : avatar} alt="userAvatar"/>
                    </NavLink>
                </div>
                <div className={s.descr}>
                    <b><div>{user.name}</div></b>
                    <div className={s.status}>{user.status}</div>
                </div>
            </div>
            {user.followed
                ? <button disabled={isFollowingProgress.some(id => id === user.id)}
                          className={s.btnFollow}
                          onClick={() => {
                              unfollow(user.id)
                          }}>unfollow</button>

                : <button disabled={isFollowingProgress.some(id => id === user.id)}
                          className={s.btnFollow}
                          onClick={() => {
                              follow(user.id)
                          }}>follow</button>
            }
        </div>
    )
}

export default User