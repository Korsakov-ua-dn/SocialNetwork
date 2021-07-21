import React from "react";
import {UsersPropsType} from "./UsersContainer";
import style from './Users.module.css'
import { useEffect } from "react";

const Users = ({usersPage, setUsers, follow, unfollow}: UsersPropsType) => {

    useEffect(() => {
        setUsers([
            {userId: 1, avatar: "https://icon-library.com/images/no-user-image-icon/no-user-image-icon-0.jpg",
                follow: false, fullName: "Alex", status: "Typical Alex", location: {country: "Russia", city: "Moscow"}},
            {userId: 2, avatar: "https://icon-library.com/images/no-user-image-icon/no-user-image-icon-0.jpg",
                follow: true, fullName: "Bro", status: "A man", location: {country: "Ukraine", city: "Donetsk"}},
            {userId: 3, avatar: "https://icon-library.com/images/no-user-image-icon/no-user-image-icon-0.jpg",
                follow: true, fullName: "Dmitriy", status: "Crazy web developer", location: {country: "Belarus", city: "Minsk"}},
        ])
    }, [])

    return (
        <div>
            {
                usersPage.users.map(u => <div key={u.userId} className={style.userWrapper}>
                    <div>
                        <div className={style.avatar}><img src={u.avatar} alt="userAvatar"/></div>
                        {u.follow
                            ? <button onClick={() => { unfollow(u.userId) }} >UNFOLLOW</button>
                            : <button onClick={() => { follow(u.userId) }}>FOLLOW</button>}
                    </div>
                    <div>
                        <div><span>{u.fullName}</span> <span>{u.location.country + ", " + u.location.city}</span></div>
                        <span>{u.status}</span>
                    </div>
                </div>)
            }
        </div>
    )
}

export default Users