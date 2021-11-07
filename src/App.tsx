import React, {Suspense} from 'react'
import s from './App.module.css'
import HeaderContainer from './Components/Header/HeaderContainer'
import Nav from './Components/Nav/Nav'
import {BrowserRouter as Router, Route, withRouter, Switch, Redirect} from 'react-router-dom'
import News from './Components/MainContent/News/News'
import Music from './Components/MainContent/Music/Music'
import Settings from './Components/MainContent/Settings/Settings'
import {connect, Provider} from 'react-redux'
import {initializeApp} from './Redux/app-reducer'
import store, {AppStateType} from './Redux/store'
import {withSuspense} from './hoc/withSuspense'
import {compose} from 'redux'
import Preloader from "./Components/common/Preloader/Preloader";

// const ProfileContainer = withSuspense(React.lazy(() => import('./Components/MainContent/Profile/ProfileContainer')))
// ленивая загрузка + пропсы прокидываем в компоненту в render () => <ProfileContainer/>

const ProfileContainer = React.lazy(() => import('./Components/MainContent/Profile/ProfileContainer'))
const DialogsContainer = React.lazy(() => import('./Components/MainContent/Dialog/DialogsContainer'))
const UsersContainer = React.lazy(() => import('./Components/MainContent/Users/UsersContainer'))
const LoginContainer = React.lazy(() => import('./Components/Login/Login'))


class App extends React.Component<AppPropsType> {

    componentDidMount() {
        this.props.initializeApp()
    }

    render() {
        return (
            <>
                <HeaderContainer/>
                <div className={s.app_wrapper}>
                    <Nav/>
                    <div className={s.app_wrapper_content}>
                        <Switch>
                            <Route exact path='/' render={() => <Redirect to="/profile"/>}/>
                            <Route path='/profile/:userId?' render={() => withSuspense(ProfileContainer)}/>
                            <Route path='/dialogs' render={() => withSuspense(DialogsContainer)}/>
                            <Route path='/users'
                                   render={() => <Suspense fallback={<Preloader isFetching={true}/>}>
                                       <UsersContainer/>
                                   </Suspense>}/>
                            <Route path='/news' component={News}/>
                            <Route path='/music' component={Music}/>
                            <Route path='/settings' component={Settings}/>
                            <Route path='/login' render={() => withSuspense(LoginContainer)}/>
                            <Route path='*' render={() => <div>404 not found</div>}/>
                        </Switch>
                    </div>
                    <div style={{display: "none"}}>learn react</div>
                    {/* need for App.test */}
                </div>
            </>
        )
    }
}

type mapDispatchToPropsType = { initializeApp: () => void }
type mapStateToPropsType = { isInit: boolean }
type AppPropsType = mapDispatchToPropsType & mapStateToPropsType

const mapStateToProps = (state: AppStateType): mapStateToPropsType => ({isInit: state.app.isInit})

let AppContainer = compose<React.ComponentType>(
    withRouter,
    connect(mapStateToProps, {initializeApp}))(App)

const SamuraiJSApp = () => {
    return (
        <Router>
            <Provider store={store}>
                <AppContainer/>
            </Provider>
        </Router>
    )
} // для App.test

export default SamuraiJSApp