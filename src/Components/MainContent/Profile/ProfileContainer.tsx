import React from 'react'
import Profile from './Profile'
import {connect} from 'react-redux'
import {AppStateType} from '../../../Redux/redux-store'
import {getUserProfile, updateUserStatus, getUserStatus, updateAvatar, ProfileType} from '../../../Redux/profile-reducer'
import {withRouter} from 'react-router-dom'
import {RouteComponentProps} from 'react-router'
// import {WithAuthRedirect} from '../../../hoc/withAuthRedirect'
import { compose } from 'redux'

class ProfileContainer extends React.Component<PropsType> {

    identificateUser() {
        let userId = this.props.match.params.userId
        if (!userId) {
            if(this.props.userId) userId = this.props.userId.toString() 
            else this.props.history.push("/login")
        }
        this.props.getUserProfile(userId)
        this.props.getUserStatus(userId)
    }

    componentDidMount() {
        this.identificateUser()
    }

    componentDidUpdate(prevProps: PropsType, prevState: {}, snapshot: any) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.identificateUser()
        }
    }

    render() {
        return <Profile isOwner={!this.props.match.params.userId} {...this.props} />
    }
}

const mapStateToProps = (state: AppStateType): mapStateToPropsType => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    userId: state.auth.id,
    isAuth: state.auth.isAuth,
})

export default compose<React.ComponentType>(
    connect(mapStateToProps, {getUserProfile, getUserStatus, updateUserStatus, updateAvatar}),
    withRouter,
)(ProfileContainer)

// types

type mapStateToPropsType = {
    profile: ProfileType | null
    status: string
    userId: number | null
    isAuth: boolean
}
type mapDispatchToPropsType = {
    getUserProfile: (userId: string) => void
    getUserStatus: (userId: string) => void
    updateUserStatus: (status: string) => void
    updateAvatar: (photo: any) => void
}
export type ProfileContainerPropsType = mapStateToPropsType & mapDispatchToPropsType
type PathParamsType = {
    userId: string,
}
type PropsType = RouteComponentProps<PathParamsType> & ProfileContainerPropsType