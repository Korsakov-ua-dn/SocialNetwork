import React from "react";
import {UsersPropsType} from "./UsersContainer";
import style from './Users.module.css'

const Users = (props: UsersPropsType) => {
    return (
        <div>
            {
                props.users.map(u => <div key={u.userId} className={style.userWrapper}>
                    <div>
                        <div className={style.avatar}><img src={u.avatar} alt="userAvatar"/></div>
                        {u.follow
                            ? <button onClick={() => { props.unfollow(u.userId) }} >UNFOLLOW</button>
                            : <button onClick={() => { props.follow(u.userId) }}>FOLLOW</button>}
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