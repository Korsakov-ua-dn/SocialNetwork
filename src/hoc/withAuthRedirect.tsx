import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {AppStateType} from '../Redux/store'

type MapStateToProps = {
    isAuth: boolean
}
let mapStateToProps = (state: AppStateType): MapStateToProps => ({
    isAuth: state.auth.isAuth
})

export function WithAuthRedirect<WrappedComponentPropsType>(Component: React.ComponentType<WrappedComponentPropsType>) {

    const RedirectComponent: React.FC<MapStateToProps> = (props) => {
        const {isAuth, ...restProps} = props
        if (!isAuth) return <Redirect to='/login'/>

        return <Component {...restProps as unknown as WrappedComponentPropsType}/>
    }

    return connect<MapStateToProps, {}, WrappedComponentPropsType, AppStateType>(mapStateToProps)(RedirectComponent)
} // не работает со стрелочной функцией, as unknown - вроде можно не писать