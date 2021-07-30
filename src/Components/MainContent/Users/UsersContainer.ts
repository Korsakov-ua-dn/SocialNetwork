import {connect} from "react-redux";
import Users from "./Users";
import {AppStateType} from "../../../Redux/redux-store";
import {Dispatch} from "redux";
import {UserDataType, usersActions, UsersPageType} from "../../../Redux/users-reducer";
import React from "react";
import axios from "axios";

class UsersContainer extends React.Component<UsersPropsType> {

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
        return {
            <Users />
        } 
    }
}

type mapStatePropsType = {
    usersPage:  UsersPageType
}
type mapDispatchPropsType = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setUsers: (users: Array<UserDataType>) => void
    setUsersCurrentPage: (currentPage: number) => void
    setTotalCount: (totalCount: number) => void
}
export type UsersPropsType = mapStatePropsType & mapDispatchPropsType

const mapStateToProps = (state: AppStateType): mapStatePropsType => {
    return {
        usersPage: state.usersPage
    }
}

const mapDispatchToProps = (dispatch: Dispatch): mapDispatchPropsType => {
    return {
        follow: (userId: number) => dispatch(usersActions.followAC(userId)),
        unfollow: (userId: number) => dispatch(usersActions.unfollowAC(userId)),
        setUsers: (users: Array<UserDataType>) => dispatch(usersActions.setUsersAC(users)),
        setUsersCurrentPage: (currentPage: number) => dispatch(usersActions.setUsersCurrentPageAC(currentPage)),
        setTotalCount: (totalCount: number) => dispatch(usersActions.setTotalCountAC(totalCount))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer)