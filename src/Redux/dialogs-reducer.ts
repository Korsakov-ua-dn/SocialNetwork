import {DialogPageType, ActionTypes} from "./state";

const dialogsReducer = (state: DialogPageType, action: ActionTypes) => {

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

export default dialogsReducer;