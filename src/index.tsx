import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


let postsData = [
  {id: 1, message: "Hey, how are your samurai way?", likesCount: 13},
  {id: 2, message: "Do not lose hope!", likesCount: 0}
]

export type PostType = {
  id: number
  message: string
  likesCount: number
}

let dialogsData = [
  {id: 1, name: 'Oleg'},
  {id: 2, name: 'Andrey'},
  {id: 3, name: 'Vadim'},
  {id: 4, name: 'Konstantin'},
  {id: 5, name: 'Stepan'}
]

export type DialogsDataPropsType = {
  dialogsData: Array<DialogItemType>
}

export type DialogItemType = {
  id: number
  name: string
}


let messagesData = [
  {id: 1, message: 'Hi'},
  {id: 2, message: 'How are your Kamasutra?'},
  {id: 3, message: 'Yo bro, is good'}
]

export type MessagesDataPropsType = {
  messagesData: Array<MessageItem>
}
export type MessageItem = {
  id: number
  message: string
}

ReactDOM.render(
  <React.StrictMode>
    <App postsData={postsData} dialogsData={dialogsData} messagesData={messagesData} />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
