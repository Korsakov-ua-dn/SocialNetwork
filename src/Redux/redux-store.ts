import {applyMiddleware, combineReducers, createStore, compose} from 'redux'
import profileReducer, {ProfileActionType} from './profile-reducer'
import dialogsReducer, {DialogsActionsType} from './dialogs-reducer'
import usersReducer, {UsersActionType} from './users-reducer'
import sidebarReducer from './sidebar-reducer'
import authReducer, {AuthActionsType} from './auth-reducer'
import appReducer, {AppActionsType} from './app-reducer'
import ThunkMiddleware from 'redux-thunk'
// import { reducer as formReducer } from 'redux-form'
import { ThunkAction } from 'redux-thunk'

let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app: appReducer,
    // form: formReducer, // redux-form state
});

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(ThunkMiddleware)
)); // для Redux DevTools

// const store = createStore(rootReducer, applyMiddleware(ThunkMiddleware)) // без Redux DevTools

// const appActions = {setUserDataAC, stopSubmit}
// type PropertiesTypes<T> = T extends { [key: string]: infer U } ? U : never
// export type InferActionTypes<T extends { [key: string]: (...args: any) => any }> = ReturnType<PropertiesTypes<T>>
// export type AppActionTypes = InferActionTypes<typeof appActions>


// types 
export type AppStoreType = typeof store
export type AppStateType = ReturnType<typeof rootReducer>
export type RootAppActionsType = AuthActionsType | DialogsActionsType | ProfileActionType | UsersActionType | AppActionsType

export type AppThunkTypes<ReturnType = void> = ThunkAction<
    ReturnType,
    AppStateType,
    unknown,  
    RootAppActionsType
>

// @ts-ignore
window.store = store

export default store;