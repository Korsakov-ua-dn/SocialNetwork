import React from 'react'
import {connect} from 'react-redux'
import Header from './Header'
import {getAuthUserData, AuthType} from '../../Redux/auth-reducer'
import {AppStateType} from '../../Redux/redux-store'

class HeaderContainer extends React.Component<HeaderContainerPropsType> {

    componentDidMount() {
        this.props.getAuthUserData()
    }

    render() {
        return <Header {...this.props}/>
    }
}

type mapStateToPropsType = {
    auth: AuthType
}
type mapDispatchToPropsType = {
    getAuthUserData: () => void
}
export type HeaderContainerPropsType = mapStateToPropsType & mapDispatchToPropsType

const mapStateToProps = (state: AppStateType): mapStateToPropsType => ({auth: state.auth})

export default connect(mapStateToProps, {getAuthUserData})(HeaderContainer);
