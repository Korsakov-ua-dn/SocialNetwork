import {combineReducers, createStore} from 'redux'
import profileReducer, {profileActions} from "./profile-reducer";
import dialogsReducer, {dialogsActions} from "./dialogs-reducer";
import usersReducer, {usersActions} from "./users-reducer"
import sidebarReducer from "./sidebar-reducer";

// export type PostType = {
//     id: number
//     message: string
//     likesCount: number
// }
// export type DialogType = {
//     id: number
//     name: string
// }
// export type MessageType = {
//     id: number
//     message: string
// }
// export type ProfilePageType = {
//     postsData: Array<PostType>
//     newPostText: string
// } 
// export type DialogPageType = {
//     dialogsData: Array<DialogType>
//     messagesData: Array<MessageType>
//     newMessageBody: string
// }
export type SidebarType = {}

type PropertiesTypes<T> = T extends {[key: string]: infer U} ? U : never
export type InferActionTypes<T extends {[key: string]: (...args: any) => any} > = ReturnType<PropertiesTypes<T>>

export const appActions = {...profileActions, ...dialogsActions, ...usersActions}

export type AppActionTypes = InferActionTypes<typeof appActions>


let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer
});

export type AppStateType = ReturnType< typeof rootReducer >

let store = createStore(rootReducer);

export type AppStoreType = typeof store;
export default store;