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
  addPost: () => void
  updateNewPostText: (newText: string) => void
  changeText: (newText: string) => void
  subscribe: (observer: ()=>void) => void
  getState: () => StateType
}

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
      ]
    },
    sidebar: {}
  },
  _rerenderEntireTree() {},
  addPost() {
    let newPost: PostType = {
      id: new Date().getTime(),
      message: this._state.profilePage.newPostText,
      likesCount: 0
    }
      this._state.profilePage.postsData.push(newPost)
      this._state.profilePage.newPostText = ""
      this._rerenderEntireTree()
  },
  updateNewPostText(newText) {
    this._state.profilePage.newPostText = newText
    this._rerenderEntireTree()
  },
  changeText(newText) {
    this._state.profilePage.newPostText = newText
    this._rerenderEntireTree()
  },
  subscribe(observer) {
    this._rerenderEntireTree = observer
  },
  getState() {
    return this._state
  }
}

export default store;