  export type PostType = {
    id: number
    message: string
    likesCount: number
  }
  
  export type DialogItemType = {
    id: number
    name: string
  }
 
  export type MessageItem = {
    id: number
    message: string
  }

let state = {

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

export default state