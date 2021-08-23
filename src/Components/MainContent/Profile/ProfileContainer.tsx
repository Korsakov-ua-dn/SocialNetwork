import React from 'react'
import Profile from './Profile'
import {connect} from 'react-redux'
import {AppStateType} from '../../../Redux/redux-store'
import {getUserProfile, updateUserStatus, getUserStatus, ProfileType} from '../../../Redux/profile-reducer'
import {withRouter} from 'react-router-dom'
import {RouteComponentProps} from 'react-router'
// import {WithAuthRedirect} from '../../../hoc/withAuthRedirect'
import { compose } from 'redux'

class ProfileContainer extends React.Component<PropsType> {

    componentDidMount() {
        let userId = this.props.match.params.userId
        if (!userId) userId = "18347"
        this.props.getUserProfile(userId)
        this.props.getUserStatus(userId)
    }

    render() {
        return <Profile {...this.props} />
    }
}

type mapStateToPropsType = {
    profile: ProfileType | null
    status: string
}
type mapDispatchToPropsType = {
    getUserProfile: (userId: string) => void
    getUserStatus: (userId: string) => void
    updateUserStatus: (status: string) => void
}
export type ProfileContainerPropsType = mapStateToPropsType & mapDispatchToPropsType
type PathParamsType = {
    userId: string,
}
type PropsType = RouteComponentProps<PathParamsType> & ProfileContainerPropsType

const mapStateToProps = (state: AppStateType): mapStateToPropsType => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status
})

export default compose<React.ComponentType>(
    connect(mapStateToProps, {getUserProfile, getUserStatus, updateUserStatus}),
    withRouter,
    // WithAuthRedirect
)(ProfileContainer)
