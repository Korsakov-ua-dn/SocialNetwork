import React from 'react';
import Profile from './Profile'
import {connect} from 'react-redux';
import {AppStateType} from '../../../Redux/redux-store'
import {profileActions} from '../../../Redux/profile-reducer'
import {withRouter} from 'react-router-dom';
import {RouteComponentProps} from "react-router";
import {authApi} from "../../../API/api";

class ProfileContainer extends React.Component<PropsType> {

    componentDidMount() {
        let userId = this.props.match.params.userId
        authApi.authMe(userId)
            .then(response => { // need to fixed
                this.props.setUserProfile(response.data)
            });
    }

    render() {
        return <Profile {...this.props} />
    }
}

type ContactType = {
    facebook: string
    github: string
    instagram: string
    mainLink: string | null
    twitter: string
    vk: string
    website: string
    youtube: string | null
}
type PhotosType = {
    small: string
    large: string
}
export type ProfileType = {
    aboutMe: string
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactType
    photos: PhotosType
}
type mapStateToPropsType = {
    profile: ProfileType | null
}
type mapDispatchToPropsType = {
    setUserProfile: (profile: ProfileType) => void
}
export type ProfileContainerPropsType = mapStateToPropsType & mapDispatchToPropsType
type PathParamsType = {
    userId: string,
}
type PropsType = RouteComponentProps<PathParamsType> & ProfileContainerPropsType

const mapStateToProps = (state: AppStateType): mapStateToPropsType => ({profile: state.profilePage.profile})

const ProfileWithUrlData = withRouter(ProfileContainer)

export default connect(mapStateToProps, {setUserProfile: profileActions.setUserProfileAC})(ProfileWithUrlData);