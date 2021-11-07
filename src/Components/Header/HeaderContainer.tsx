import React from 'react'
import {connect} from 'react-redux'
import Header from './Header'
import {logout, AuthType} from '../../Redux/auth-reducer'
import {AppStateType} from '../../Redux/store'

class HeaderContainer extends React.Component<HeaderContainerPropsType> {

    render() {
        return <Header {...this.props}/>
    }
}

type mapStateToPropsType = {auth: AuthType}
type mapDispatchToPropsType = {
    logout: () => void
}
export type HeaderContainerPropsType = mapStateToPropsType & mapDispatchToPropsType

const mapStateToProps = (state: AppStateType): mapStateToPropsType => ({auth: state.auth})

export default connect(mapStateToProps, {logout})(HeaderContainer);
