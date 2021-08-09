import axios from 'axios'
import React from 'react'
import {connect} from 'react-redux'
import Header from './Header'
import {authActions, AuthType} from '../../Redux/auth-reducer'
import {AppStateType} from '../../Redux/redux-store'

class HeaderContainer extends React.Component<HeaderContainerPropsType> {

    componentDidMount() {
        axios.get("https://social-network.samuraijs.com/api/1.0/auth/me", {
            withCredentials: true
        })
            .then(responce => {
                if (responce.data.resultCode === 0) {
                    let {id, email, login} = responce.data.data
                    this.props.setAuthUserData(id, email, login)
                }
            })
    }

    render() {
        return <Header {...this.props}/>
    }
}

type mapStateToPropsType = {
    auth: AuthType
}
type mapDispatchToPropsType = {
    setAuthUserData: (id: number, email: string, login: string) => void
}
export type HeaderContainerPropsType = mapStateToPropsType & mapDispatchToPropsType

const mapStateToProps = (state: AppStateType): mapStateToPropsType => ({auth: state.auth})

export default connect(mapStateToProps, {setAuthUserData: authActions.setUserDataAC})(HeaderContainer);
