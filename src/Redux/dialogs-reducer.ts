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
    messagesData: [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'How are your Kamasutra?'},
        {id: 3, message: 'Yo bro, is good'}
    ] as Array<MessageType>,
}

const dialogsReducer = (state: DialogPageType = initialState, action: DialogsActionsType): DialogPageType => {
    switch (action.type) {
        case "SEND-MESSAGE":
            return {
                ...state,
                messagesData: [...state.messagesData, {id: 6, message: action.newMessageBody}]
            }
        default:
            return state;
    }
}

// actions
export const sendMessageAC = (newMessageBody: string) => ({type: "SEND-MESSAGE", newMessageBody} as const)

// types
type SendMessageActionType = ReturnType<typeof sendMessageAC>
export type DialogsActionsType = SendMessageActionType

export default dialogsReducer;