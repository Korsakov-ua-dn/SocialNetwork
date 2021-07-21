import React from "react";
import {UsersPropsType} from "./UsersContainer";
import style from './Users.module.css'
import axios from "axios";
import avatar from '../../../assets/img/null-avatar-icon.jpg'

class Users extends React.Component<UsersPropsType> {
    // constructor(props: UsersPropsType) {
    //     super(props)
    // }

    componentDidMount() {
        axios.get("https://social-network.samuraijs.com/api/1.0/users")
            .then((response: any) => {
                this.props.setUsers(response.data.items)
            });
    }
    
    render () {
        return (
        <div>
            {
                this.props.usersPage.users.map(u => <div key={u.id} className={style.userWrapper}>
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