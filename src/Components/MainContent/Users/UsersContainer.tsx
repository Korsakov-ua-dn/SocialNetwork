import {connect} from "react-redux";
import {AppStateType} from "../../../Redux/redux-store";
import {UsersPageType, getUsers, follow, unfollow} from "../../../Redux/users-reducer";
import React from "react";
import Users from "./Users";
import Preloader from "../../common/Preloader/Preloader"

class UsersContainer extends React.Component<UsersContainerPropsType> {

    componentDidMount() {
        this.props.getUsers(this.props.usersPage.currentPage, this.props.usersPage.pageSize)
    }

    onPageChanged = (p: number) => {
        this.props.getUsers(p, this.props.usersPage.pageSize)
    }

    render() {
        return (
            <>
                <Preloader isFetching={this.props.usersPage.isFetching}/>
                <Users
                    usersPage={this.props.usersPage}
                    follow={this.props.follow}
                    unfollow={this.props.unfollow}
                    onPageChanged={this.onPageChanged}
                />
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
    getUsers: (currentPage: number, pageSize: number) => void
}
export type UsersContainerPropsType = mapStatePropsType & mapDispatchPropsType

const mapStateToProps = (state: AppStateType): mapStatePropsType => {
    return {
        usersPage: state.usersPage
    }
}

export default connect(mapStateToProps, {
    follow,
    unfollow,
    getUsers
})(UsersContainer)