import React, { Suspense } from 'react'
import s from './App.module.css'
import HeaderContainer from './Components/Header/HeaderContainer'
import Nav from './Components/Nav/Nav'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import News from './Components/MainContent/News/News'
import Music from './Components/MainContent/Music/Music'
import Settings from './Components/MainContent/Settings/Settings'
import { connect, Provider } from 'react-redux'
import {initializeApp} from './Redux/app-reducer'
import store, {AppStateType} from './Redux/redux-store'
import { withSuspense } from './hoc/withSuspense'

// const ProfileContainer = withSuspense(React.lazy(() => import('./Components/MainContent/Profile/ProfileContainer')))
// ленивая загрузка + пропсы прокидываем в компоненту

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
            <div className={`${s.app_wrapper} container`}>
                <HeaderContainer/>
                <Nav/>
                <div className={s.app_wrapper_content}>
                    <Route path='/profile/:userId?' render={ () => withSuspense(ProfileContainer) }/>
                    <Route path='/dialogs' render={ () => withSuspense(DialogsContainer) }/>
                    <Route path='/users'
                           render={() => <Suspense fallback={<div>Загрузка...</div>}>
                           <UsersContainer />
                       </Suspense>}/>
                    <Route path='/news' component={News}/>
                    <Route path='/music' component={Music}/>
                    <Route path='/settings' component={Settings}/>
                    <Route path='/login' render={() => withSuspense(LoginContainer) } />
                </div>
                <div style={{display: "none"}}>learn react</div>
            </div>
        )
    }
}

type mapDispatchToPropsType = {initializeApp: () => void}
type mapStateToPropsType = {isInit: boolean}
type AppPropsType = mapDispatchToPropsType & mapStateToPropsType

const mapStateToProps = (state: AppStateType): mapStateToPropsType => ({isInit: state.app.isInit})

let AppContainer = connect(mapStateToProps, {initializeApp} )(App)

const SamuraiJSApp = () => {
    return (
     <Router>
        <Provider store={store} >
            <AppContainer />
        </Provider>
    </Router>
    )
} // для App.test

export default SamuraiJSApp