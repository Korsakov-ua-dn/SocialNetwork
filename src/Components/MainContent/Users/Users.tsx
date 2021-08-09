import style from './Users.module.css'
import avatar from '../../../assets/img/null-avatar-icon.jpg'
import {UsersPageType} from '../../../Redux/users-reducer'
import {NavLink} from 'react-router-dom'
import axios from 'axios'

type UsersPropsType = {
    usersPage: UsersPageType
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    onPageChanged: (currentPage: number) => void
}

const Users = (props: UsersPropsType) => {

    const state = props.usersPage

    let pagesCount = Math.ceil(state.totalCount / state.pageSize)
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
                        className={state.currentPage === p ? style.selectedPage : ""}
                        onClick={() => props.onPageChanged(p)}
                    >{p} </span>)
                }
            </div>
            {
                state.users.map(u => <div key={u.id} className={style.userWrapper}>
                    <div>
                        <div className={style.avatar}>
                            <NavLink to={"/profile/" + u.id}>
                                <img src={u.photos.small ? u.photos.small : avatar} alt="userAvatar"/>
                            </NavLink>
                        </div>
                        {u.followed

                            ? <button onClick={() => {
                                axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {
                                    withCredentials: true,
                                    headers: {
                                        'API-KEY': '7310af47-87fb-4f01-ab93-b6fcc5cb60c0'
                                    },
                                })
                                    .then(response => {
                                        if (response.data.resultCode === 0) {
                                            props.unfollow(u.id)
                                        }
                                    });
                            }}>UNFOLLOW</button>

                            : <button onClick={() => {
                                axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {}, {
                                    withCredentials: true,
                                    headers: {
                                        'API-KEY': '7310af47-87fb-4f01-ab93-b6fcc5cb60c0'
                                    },
                                })
                                    .then(response => {
                                        if (response.data.resultCode === 0) {
                                            props.follow(u.id)
                                        }
                                    })
                            }}>FOLLOW</button>}
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