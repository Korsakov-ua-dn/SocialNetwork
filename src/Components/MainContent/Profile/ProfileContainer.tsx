import React from 'react';
import Profile from './Profile'
import {connect} from 'react-redux';
import {AppStateType} from '../../../Redux/redux-store'
import {getUserProfile, ProfileType} from '../../../Redux/profile-reducer'
import {Redirect, withRouter} from 'react-router-dom';
import {RouteComponentProps} from "react-router";

class ProfileContainer extends React.Component<PropsType> {

    componentDidMount() {
        let userId = this.props.match.params.userId
        if (!userId) userId = "2"
        this.props.getUserProfile(userId)
    }

    render() {
        if (!this.props.isAuth) return <Redirect to='/login'/>
        return <Profile {...this.props} />
    }
}

type mapStateToPropsType = {
    profile: ProfileType | null
    isAuth: boolean
}
type mapDispatchToPropsType = {
    getUserProfile: (userId: string) => void
}
export type ProfileContainerPropsType = mapStateToPropsType & mapDispatchToPropsType
type PathParamsType = {
    userId: string,
}
type PropsType = RouteComponentProps<PathParamsType> & ProfileContainerPropsType

const mapStateToProps = (state: AppStateType): mapStateToPropsType => ({
    profile: state.profilePage.profile,
    isAuth: state.auth.isAuth
})

const ProfileWithUrlData = withRouter(ProfileContainer)

export default connect(mapStateToProps, {getUserProfile})(ProfileWithUrlData);