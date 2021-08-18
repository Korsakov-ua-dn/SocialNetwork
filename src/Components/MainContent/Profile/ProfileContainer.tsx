import React from 'react'
import Profile from './Profile'
import {connect} from 'react-redux'
import {AppStateType} from '../../../Redux/redux-store'
import {getUserProfile, ProfileType} from '../../../Redux/profile-reducer'
import {withRouter} from 'react-router-dom'
import {RouteComponentProps} from 'react-router'
import {WithAuthRedirect} from '../../../hoc/withAuthRedirect'

class ProfileContainer extends React.Component<PropsType> {

    componentDidMount() {
        let userId = this.props.match.params.userId
        if (!userId) userId = "2"
        this.props.getUserProfile(userId)
    }

    render() {
        return <Profile {...this.props} />
    }
}

type mapStateToPropsType = {
    profile: ProfileType | null
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
})

const ProfileWithUrlData = withRouter(ProfileContainer)

export default WithAuthRedirect(connect(mapStateToProps, {getUserProfile})(ProfileWithUrlData))