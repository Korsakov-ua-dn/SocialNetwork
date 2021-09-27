import style from './Users.module.css'
import avatar from '../../../assets/img/null-avatar-icon.jpg'
import {UserDataType} from '../../../Redux/users-reducer'
import {NavLink} from 'react-router-dom'

type UsersPropsType = {
    users: Array<UserDataType>
    totalCount: number
    pageSize: number
    currentPage: number
    isFollowingProgress: number[]
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    onPageChanged: (currentPage: number) => void
}

const Users = (props: UsersPropsType) => {


    let pagesCount = Math.ceil(props.totalCount / props.pageSize)
    let pages = []

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    return (
        <div>
            <div>
                {
                    pages.map(p => <span
                        key={p}
                        className={props.currentPage === p ? style.selectedPage : ""}
                        onClick={() => props.onPageChanged(p)}
                    >{p} </span>)
                }
            </div>
            {
                props.users.map(u => <div key={u.id} className={style.userWrapper}>
                    <div>
                        <div className={style.avatar}>
                            <NavLink to={"/profile/" + u.id}>
                                <img src={u.photos.small ? u.photos.small : avatar} alt="userAvatar"/>
                            </NavLink>
                        </div>
                        {u.followed
                            ? <button disabled={props.isFollowingProgress.some(id => id === u.id)}
                                      onClick={() => {
                                          props.unfollow(u.id)
                                      }}>UNFOLLOW</button>

                            : <button disabled={props.isFollowingProgress.some(id => id === u.id)}
                                      onClick={() => {
                                          props.follow(u.id)
                                      }}>FOLLOW</button>
                        }
                    </div>
                    <div>
                        <div>
                            <span>{u.name}</span> <span>{'"u.location.country" + ", " + "u.location.city"'}</span>
                        </div>
                        <span>{u.status}</span>
                    </div>
                </div>)
            }
        </div>
    )
}

export default Users