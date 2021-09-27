import {connect} from 'react-redux'
import {AppStateType} from '../../../Redux/redux-store'
import {requestUsers, follow, unfollow, UsersPageType, UserDataType} from '../../../Redux/users-reducer'
import React from 'react'
import Users from './Users'
import Preloader from '../../common/Preloader/Preloader'
// import {WithAuthRedirect} from '../../../hoc/withAuthRedirect'
import {compose} from 'redux'
import {
    getUsers,
    getTotalCount,
    getPageSize,
    getCurrentPage,
    getIsFollowingProgress, getIsFetching
} from '../../../Redux/Users-selectors'

class UsersContainer extends React.Component<UsersContainerPropsType> {

    componentDidMount() {
        this.props.requestUsers(this.props.currentPage, this.props.pageSize)
    }

    onPageChanged = (p: number) => {
        this.props.requestUsers(p, this.props.pageSize)
    }

    render() {
        return (
            <>
                <Preloader isFetching={this.props.isFetching}/>
                <Users
                    users={this.props.users}
                    totalCount={this.props.totalCount}
                    pageSize={this.props.pageSize}
                    currentPage={this.props.currentPage}
                    isFollowingProgress={this.props.isFollowingProgress}
                    follow={this.props.follow}
                    unfollow={this.props.unfollow}
                    onPageChanged={this.onPageChanged}
                />
            </>
        )
    }
}

type mapStatePropsType = {
    users: Array<UserDataType>
    totalCount: number
    pageSize: number
    currentPage: number
    isFollowingProgress: number[]
    isFetching: boolean
}
type mapDispatchPropsType = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    requestUsers: (currentPage: number, pageSize: number) => void
}
export type UsersContainerPropsType = mapStatePropsType & mapDispatchPropsType

const mapStateToProps = (state: AppStateType): mapStatePropsType => ({
    users: getUsers(state.usersPage),
    totalCount: getTotalCount(state.usersPage),
    pageSize: getPageSize(state.usersPage),
    currentPage: getCurrentPage(state.usersPage),
    isFollowingProgress: getIsFollowingProgress(state.usersPage),
    isFetching: getIsFetching(state.usersPage),
})

export default compose<React.ComponentType>(
    connect(mapStateToProps, {follow, unfollow, getUsers: requestUsers}),
)(UsersContainer)