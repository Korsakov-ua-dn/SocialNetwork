// import profileReducer from "./profile-reducer";
// import dialogsReducer from "./dialogs-reducer";
// import sidebarReducer from "./sidebar-reducer";

export type PostType = {
  id: number
  message: string
  likesCount: number
}
// export type DialogType = {
//   id: number
//   name: string
// }
// export type MessageType = {
//   id: number
//   message: string
// }
// export type ProfilePageType = {
//   postsData: Array<PostType>
//   newPostText: string
// } 
// export type DialogPageType = {
//   dialogsData: Array<DialogType>
//   messagesData: Array<MessageType>
//   newMessageBody: string
// }
// export type SidebarType = {}
// export type StateType = {
//   profilePage: ProfilePageType
//   dialogsPage: DialogPageType
//   sidebar: SidebarType
// }
// export type StoreType = {
//   _state: StateType
//   _rerenderEntireTree: () => void
//   subscribe: (observer: ()=>void) => void
//   getState: () => StateType
//   dispatch: (action: any) => void
// }
// // export type ActionTypes = ReturnType<typeof addPostAC>
// //   | ReturnType<typeof updateNewPostTextAC>
// //   | ReturnType<typeof changeTextAC>
// //   | ReturnType<typeof changeMessageBodyAC>
// //   | ReturnType<typeof sendMessageAC>

// type PropertiesTypes<T> = T extends {[key: string]: infer U} ? U : never
// export type InferActionTypes<T extends {[key: string]: (...args: any) => any} > = ReturnType<PropertiesTypes<T>>

// // let store: StoreType = {
// //   _state: {
// //     profilePage: {
// //       postsData: [
// //         {id: 1, message: "Hey, how are your samurai way?", likesCount: 13},
// //         {id: 2, message: "Do not lose hope!", likesCount: 0}
// //       ],
// //     newPostText: 'it-kamasutra.com'
// //     },
  
// //     dialogsPage: {
// //       dialogsData: [
// //         {id: 1, name: 'Oleg'},
// //         {id: 2, name: 'Andrey'},
// //         {id: 3, name: 'Vadim'},
// //         {id: 4, name: 'Konstantin'},
// //         {id: 5, name: 'Stepan'}
// //       ],
// //       messagesData:  [
// //         {id: 1, message: 'Hi'},
// //         {id: 2, message: 'How are your Kamasutra?'},
// //         {id: 3, message: 'Yo bro, is good'}
// //       ],
// //       newMessageBody: ""
// //     },
// //     sidebar: {}
// //   },
// //   _rerenderEntireTree() {},
// //   subscribe(observer) {
// //     this._rerenderEntireTree = observer
// //   },
// //   getState() {
// //     return this._state
// //   },

// //   dispatch(action) {

// //     this._state.profilePage = profileReducer(this._state.profilePage, action)
// //     this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)
// //     this._state.sidebar = sidebarReducer(this._state.sidebar, action)
// //     this._rerenderEntireTree()

// //   }
// // }

// export const addPostAC = () => ({type: "ADD-POST"}) as const
// export const updateNewPostTextAC= (text: string) => ({type: "UPDATE-NEW-POST-TEXT", newText: text}) as const
// export const changeTextAC = (newText: string) => ({type: "CHANGE-TEXT", newText: newText}) as const
// export const changeMessageBodyAC = (body: string) => ({type: "CHANGE-MESSAGE-BODY", body: body}) as const
// export const sendMessageAC = () => ({type: "SEND-MESSAGE"}) as const

// // export default store;