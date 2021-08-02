import {connect} from "react-redux";
import {AppStateType} from "../../../Redux/redux-store";
import {Dispatch} from "redux";
import {UserDataType, usersActions, UsersPageType} from "../../../Redux/users-reducer";
import React from "react";
import axios from "axios";
import Users from "./Users";
import Preloader from "../../common/Preloader/Preloader"


class UsersContainer extends React.Component<UsersPropsType> {

    componentDidMount() {
        this.props.toggleIsFetching(true)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.usersPage.currentPage}&count=${this.props.usersPage.pageSize}`)
            .then((response: any) => {
                this.props.toggleIsFetching(false)
                this.props.setUsers(response.data.items)
                this.props.setTotalCount(response.data.totalCount)
            });
    }

    onPageChanged = (p: number) => {
        this.props.onPageChanged(p)
        this.props.toggleIsFetching(true)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${p}&count=${this.props.usersPage.pageSize}`)
            .then((response: any) => {
                this.props.toggleIsFetching(false)
                this.props.setUsers(response.data.items)
            });
    }

    render() {
        return (
            <>
                <Preloader isFetching={this.props.usersPage.isFetching}/>
                <Users
                    usersPage={this.props.usersPage}
                    follow={this.props.follow}
                    unfollow={this.props.unfollow}
                    setUsers={this.props.setUsers}
                    onPageChanged={this.onPageChanged}
                    setTotalCount={this.props.setTotalCount}
                    toggleIsFetching={this.props.toggleIsFetching}/>
            </>
        )
    }
}

type mapStatePropsType = {
    usersPage: UsersPageType
}
type mapDispatchPropsType = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setUsers: (users: Array<UserDataType>) => void
    onPageChanged: (currentPage: number) => void
    setTotalCount: (totalCount: number) => void
    toggleIsFetching: (isFetching: boolean) => void
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
        onPageChanged: (currentPage: number) => dispatch(usersActions.setUsersCurrentPageAC(currentPage)),
        setTotalCount: (totalCount: number) => dispatch(usersActions.setTotalCountAC(totalCount)),
        toggleIsFetching: (isFetching: boolean) => dispatch(usersActions.toggleIsFetchingAC(isFetching)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer)