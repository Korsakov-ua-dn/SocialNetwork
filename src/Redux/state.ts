import {rerenderEntireTree} from '../render'

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



export type StateType = {
  postsData: Array<PostType>
  dialogsData: Array<DialogType>
  messagesData: Array<MessageType>
}

export let state = {

    postsData: [
        {id: 1, message: "Hey, how are your samurai way?", likesCount: 13},
        {id: 2, message: "Do not lose hope!", likesCount: 0}
    ],

    dialogsData: [
        {id: 1, name: 'Oleg'},
        {id: 2, name: 'Andrey'},
        {id: 3, name: 'Vadim'},
        {id: 4, name: 'Konstantin'},
        {id: 5, name: 'Stepan'}
    ],

    messagesData: [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'How are your Kamasutra?'},
        {id: 3, message: 'Yo bro, is good'}
    ]
}
 
export const addPost = (postText: string) => {
  let newPost: PostType = {
    id: new Date().getTime(),
    message: postText,
    likesCount: 0
  }
    state.postsData.push(newPost)
    rerenderEntireTree(state)
    
}

export default state