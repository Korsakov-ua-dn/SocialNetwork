import React from "react";
import {UsersPropsType} from "./UsersContainer";
import style from './Users.module.css'
import axios from "axios";
import avatar from '../../../assets/img/null-avatar-icon.jpg'

class Users extends React.Component<UsersPropsType> {

    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.usersPage.curentPage}&count=${this.props.usersPage.pageSize}`)
            .then((response: any) => {
                this.props.setUsers(response.data.items)
                this.props.setTotalCount(response.data.totalCount)
            });
    }

    onPageChanged = (p: number) => {
        this.props.setUsersCurrentPage(p)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${p}&count=${this.props.usersPage.pageSize}`)
            .then((response: any) => {
                this.props.setUsers(response.data.items)
            });
    }
    
    render() {
        const state = this.props.usersPage

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
                        className={state.curentPage === p ? style.selectedPage : ""}
                        onClick={() => this.onPageChanged(p)}
                    >{p} </span>)
                }
            </div>
            {
                state.users.map(u => <div key={u.id} className={style.userWrapper}>
                    <div>
                        <div className={style.avatar}><img src={u.photos.small ? u.photos.small : avatar} alt="userAvatar"/></div>
                        {u.follow
                            ? <button onClick={() => { this.props.unfollow(u.id) }} >UNFOLLOW</button>
                            : <button onClick={() => { this.props.follow(u.id) }}>FOLLOW</button>}
                    </div>
                    <div>
                        <div><span>{u.name}</span> <span>{'"u.location.country" + ", " + "u.location.city"'}</span></div>
                        <span>{u.status}</span>
                    </div>
                </div>)
            }
        </div>
        )
    }
}

export default Users