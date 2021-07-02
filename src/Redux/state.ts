export type PostType = {
  id: number
  message: string
  likesCount: number
}
export type DialogType = {
  id: number
  name: string
}
export type MessageType = {
  id: number
  message: string
}
export type ProfilePageType = {
  postsData: Array<PostType>
  newPostText: string
} 
export type DialogPageType = {
  dialogsData: Array<DialogType>
  messagesData: Array<MessageType>
  newMessageBody: string
}
export type SidebarType = {}
export type StateType = {
  profilePage: ProfilePageType
  dialogsPage: DialogPageType
  sidebar: SidebarType
}
export type StoreType = {
  _state: StateType
  _rerenderEntireTree: () => void
  subscribe: (observer: ()=>void) => void
  getState: () => StateType
  dispatch: (action: ActionTypes) => void
}
export type ActionTypes = ReturnType<typeof addPostAC>
  | ReturnType<typeof updateNewPostTextAC>
  | ReturnType<typeof changeTextAC>
  | ReturnType<typeof changeMessageBodyAC>
  | ReturnType<typeof sendMessageAC>

let store: StoreType = {
  _state: {
    profilePage: {
      postsData: [
        {id: 1, message: "Hey, how are your samurai way?", likesCount: 13},
        {id: 2, message: "Do not lose hope!", likesCount: 0}
      ],
    newPostText: 'it-kamasutra.com'
    },
  
    dialogsPage: {
      dialogsData: [
        {id: 1, name: 'Oleg'},
        {id: 2, name: 'Andrey'},
        {id: 3, name: 'Vadim'},
        {id: 4, name: 'Konstantin'},
        {id: 5, name: 'Stepan'}
      ],
      messagesData:  [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'How are your Kamasutra?'},
        {id: 3, message: 'Yo bro, is good'}
      ],
      newMessageBody: ""
    },
    sidebar: {}
  },
  _rerenderEntireTree() {},
  subscribe(observer) {
    this._rerenderEntireTree = observer
  },
  getState() {
    return this._state
  },

  dispatch(action) {
    switch(action.type) {

      case "ADD-POST":
        let newPost: PostType = {
          id: new Date().getTime(),
          message: this._state.profilePage.newPostText,
          likesCount: 0
        }
        this._state.profilePage.postsData.push(newPost)
        this._state.profilePage.newPostText = ""
        this._rerenderEntireTree()
        break;

      case "UPDATE-NEW-POST-TEXT":
        this._state.profilePage.newPostText = action.newText
        this._rerenderEntireTree()
        break;

      case "CHANGE-TEXT":
        this._state.profilePage.newPostText = action.newText
        this._rerenderEntireTree()
        break;

      case "CHANGE-MESSAGE-BODY":
        this._state.dialogsPage.newMessageBody = action.body
        this._rerenderEntireTree()
        break;

      case "SEND-MESSAGE":
        let body = this._state.dialogsPage.newMessageBody
        this._state.dialogsPage.newMessageBody = ''
        this._state.dialogsPage.messagesData.push({id: 6, message: body})
        this._rerenderEntireTree()
        break;
    }
  }
}

export const addPostAC = () => ({type: "ADD-POST"}) as const
export const updateNewPostTextAC= (text: string) => ({type: "UPDATE-NEW-POST-TEXT", newText: text}) as const
export const changeTextAC = (newText: string) => ({type: "CHANGE-TEXT", newText: newText}) as const
export const changeMessageBodyAC = (body: string) => ({type: "CHANGE-MESSAGE-BODY", body: body}) as const
export const sendMessageAC = () => ({type: "SEND-MESSAGE"}) as const

export default store;