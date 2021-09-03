import {applyMiddleware, combineReducers, createStore} from 'redux'
import profileReducer, {ProfileActionType} from './profile-reducer'
import dialogsReducer, {DialogsActionsType} from './dialogs-reducer'
import usersReducer, {UsersActionType} from './users-reducer'
import sidebarReducer from './sidebar-reducer'
import authReducer, {AuthActionsType} from './auth-reducer'
import ThunkMiddleware from 'redux-thunk'
import { reducer as formReducer } from 'redux-form'
import { ThunkAction } from 'redux-thunk'

let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer, // redux-form state
});

let store = createStore(rootReducer, applyMiddleware(ThunkMiddleware))


// const appActions = {setUserDataAC, stopSubmit}
// type PropertiesTypes<T> = T extends { [key: string]: infer U } ? U : never
// export type InferActionTypes<T extends { [key: string]: (...args: any) => any }> = ReturnType<PropertiesTypes<T>>
// export type AppActionTypes = InferActionTypes<typeof appActions>


// types 
export type AppStoreType = typeof store
export type AppStateType = ReturnType<typeof rootReducer>
export type AppActionTypes = AuthActionsType | DialogsActionsType | ProfileActionType | UsersActionType

export type AppThunkTypes<ReturnType = void> = ThunkAction<
    ReturnType,
    AppStateType,
    unknown,  
    AppActionTypes
>

// @ts-ignore
window.store = store

export default store;