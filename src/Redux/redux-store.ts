import {applyMiddleware, combineReducers, createStore} from 'redux'
import profileReducer, {profileActions} from './profile-reducer'
import dialogsReducer, {dialogsActions} from './dialogs-reducer'
import usersReducer, {usersActions} from './users-reducer'
import sidebarReducer from './sidebar-reducer'
import authReducer, {setUserDataAC} from './auth-reducer'
import ThunkMiddleware from 'redux-thunk'
import { reducer as formReducer } from 'redux-form'
import { ThunkAction } from 'redux-thunk'

const appActions = {...profileActions, ...dialogsActions, ...usersActions, setUserDataAC}

type PropertiesTypes<T> = T extends { [key: string]: infer U } ? U : never
export type InferActionTypes<T extends { [key: string]: (...args: any) => any }> = ReturnType<PropertiesTypes<T>>
export type AppActionTypes = InferActionTypes<typeof appActions>

export type AppStoreType = typeof store
export type AppStateType = ReturnType<typeof rootReducer>

export type AppThunkTypes<ReturnType = void> = ThunkAction<
    ReturnType,
    AppStateType,
    unknown,  
    AppActionTypes
>

let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer, // redux-form state
});

let store = createStore(rootReducer, applyMiddleware(ThunkMiddleware));

// @ts-ignore
window.store = store


export default store;