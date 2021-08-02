import style from './Users.module.css'
import avatar from '../../../assets/img/null-avatar-icon.jpg'
import {UsersPageType} from '../../../Redux/users-reducer'

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
                        <div className={style.avatar}><img src={u.photos.small ? u.photos.small : avatar}
                                                           alt="userAvatar"/></div>
                        {u.follow
                            ? <button onClick={() => {
                                props.unfollow(u.id)
                            }}>UNFOLLOW</button>
                            : <button onClick={() => {
                                props.follow(u.id)
                            }}>FOLLOW</button>}
                    </div>
                    <div>
                        <div><span>{u.name}</span> <span>{'"u.location.country" + ", " + "u.location.city"'}</span>
                        </div>
                        <span>{u.status}</span>
                    </div>
                </div>)
            }
        </div>
    )
}

export default Users