import {connect} from "react-redux";
import {AppStateType} from "../../../Redux/redux-store";
import {UserDataType, usersActions, UsersPageType} from "../../../Redux/users-reducer";
import React from "react";
import Users from "./Users";
import Preloader from "../../common/Preloader/Preloader"
import {userApi} from "../../../API/api";

class UsersContainer extends React.Component<UsersContainerPropsType> {

    componentDidMount() {

        this.props.toggleIsFetching(true)
        userApi.getUsers(this.props.usersPage.currentPage, this.props.usersPage.pageSize)
            .then(data => {
                this.props.toggleIsFetching(false)
                this.props.setUsers(data.items)
                this.props.setTotalCount(data.totalCount)
            });
    }

    onPageChanged = (p: number) => {
        this.props.onPageChanged(p)
        this.props.toggleIsFetching(true)
        userApi.getUsers(p, this.props.usersPage.pageSize)
            .then(data => {
                this.props.toggleIsFetching(false)
                this.props.setUsers(data.items)
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
                    onPageChanged={this.onPageChanged}/>
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
export type UsersContainerPropsType = mapStatePropsType & mapDispatchPropsType

const mapStateToProps = (state: AppStateType): mapStatePropsType => {
    return {
        usersPage: state.usersPage
    }
}

export default connect(mapStateToProps, {
    follow: usersActions.followAC,
    unfollow: usersActions.unfollowAC,
    setUsers: usersActions.setUsersAC,
    onPageChanged: usersActions.setUsersCurrentPageAC,
    setTotalCount: usersActions.setTotalCountAC,
    toggleIsFetching: usersActions.toggleIsFetchingAC,
})(UsersContainer)