import {DialogPageType, AppActionTypes} from "./redux-store";

let initialState = {
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
  }

const dialogsReducer = (state: DialogPageType = initialState, action: AppActionTypes): DialogPageType => {

    switch(action.type) {

        case "CHANGE-MESSAGE-BODY":
            state.newMessageBody = action.body
            return state;

        case "SEND-MESSAGE":
            let body = state.newMessageBody
            state.newMessageBody = ''
            state.messagesData.push({id: 6, message: body})
            return state;

        default:
            return state;

    }
}

export const dialogsActions = {
    changeMessageBodyAC:  (body: string) => ({type: "CHANGE-MESSAGE-BODY", body: body} as const),
    sendMessageAC:  () => ({type: "SEND-MESSAGE"} as const),
}

export default dialogsReducer;