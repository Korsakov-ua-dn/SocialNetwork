import {AppActionTypes} from "./redux-store";

export type DialogType = {
  id: number
  name: string
}
export type MessageType = {
  id: number
  message: string
}
export type DialogPageType = typeof initialState

let initialState = {
    dialogsData: [
      {id: 1, name: 'Oleg'},
      {id: 2, name: 'Andrey'},
      {id: 3, name: 'Vadim'},
      {id: 4, name: 'Konstantin'},
      {id: 5, name: 'Stepan'}
    ] as Array<DialogType>,
    messagesData:  [
      {id: 1, message: 'Hi'},
      {id: 2, message: 'How are your Kamasutra?'},
      {id: 3, message: 'Yo bro, is good'}
    ] as Array<MessageType>,
    newMessageBody: ""
  }

const dialogsReducer = (state: DialogPageType = initialState, action: AppActionTypes): DialogPageType => {
  

    switch(action.type) {

      case "CHANGE-MESSAGE-BODY":
        return {
          ...state,
          newMessageBody: action.body
        }

      case "SEND-MESSAGE":
        let body = state.newMessageBody
        return {
          ...state,
          newMessageBody: '',
          messagesData: [...state.messagesData, {id: 6, message: body}]
        }

      default:
          return state;

    }
}

export const dialogsActions = {
    changeMessageBodyAC:  (body: string) => ({type: "CHANGE-MESSAGE-BODY", body: body} as const),
    sendMessageAC:  () => ({type: "SEND-MESSAGE"} as const),
}

export default dialogsReducer;