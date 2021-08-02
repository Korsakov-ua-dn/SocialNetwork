import React from 'react';
import Profile from './Profile'
import { connect } from 'react-redux';
import {AppStateType} from '../../../Redux/redux-store'
import axios from "axios";
import {profileActions} from '../../../Redux/profile-reducer'

class ProfileContainer extends React.Component<ProfileContainerPropsType> {

    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/2`)
            .then((response: any) => { // need to fixed
                this.props.setUserProfile(response.data)
            });
    }

    render() {
        return <Profile {...this.props} />
    }
}
type mapStateToPropsType = {
    profile: any // need to fixed
}
type mapDispatchToPropsType = {
    setUserProfile: (profile: any) => void // need to fixed
}
export type ProfileContainerPropsType = mapStateToPropsType & mapDispatchToPropsType

const mapStateToProps = (state: AppStateType) => ({profile: state.profilePage.profile})


export default connect(mapStateToProps, {setUserProfile: profileActions.setUserProfileAC})(ProfileContainer);