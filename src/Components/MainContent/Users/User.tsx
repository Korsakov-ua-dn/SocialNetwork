import style from './User.module.css'
import avatar from '../../../assets/img/null-avatar-icon.jpg'
import { UserDataType } from '../../../Redux/users-reducer'
import { NavLink } from 'react-router-dom'

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
        <div className={style.userWrapper}>
            <div>
                <div className={style.avatar}>
                    <NavLink to={"/profile/" + user.id}>
                        <img src={user.photos.small ? user.photos.small : avatar} alt="userAvatar"/>
                    </NavLink>
                </div>
                {user.followed
                    ? <button disabled={isFollowingProgress.some(id => id === user.id)}
                                onClick={() => {unfollow(user.id)} }>UNFOLLOW</button>

                    : <button disabled={isFollowingProgress.some(id => id === user.id)}
                                onClick={() => {follow(user.id)} }>FOLLOW</button>
                }
            </div>
            <div>
                <div>
                    <span>{user.name}</span> <span>{'"u.location.country" + ", " + "u.location.city"'}</span>
                </div>
                <span>{user.status}</span>
            </div>
        </div>
    )
}

export default User