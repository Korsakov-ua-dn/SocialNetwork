import Dialogs from './Dialogs'
import {AppStateType} from '../../../Redux/store'
import {sendMessageAC, DialogType, MessageType} from '../../../Redux/dialogs-reducer'
import {compose, Dispatch} from 'redux'
import {connect} from 'react-redux'
import {WithAuthRedirect} from '../../../hoc/withAuthRedirect'
import React from "react"

// type DialogsPropsType = {
//     store: AppStateType
// }
// const DialogsContainer = () => {
//     return (
//         <StoreContext.Consumer>
//             {
//                 (store) => {
//                     let localState = store.getState().dialogsPage
//                     const sendMessage = () => {
//                         store.dispatch(dialogsActions.sendMessageAC())
//                     }
//                     const changeMessage = (body: string) => {
//                         store.dispatch(dialogsActions.changeMessageBodyAC(body))
//                     }
//                     return <Dialogs 
//                         sendMessage={sendMessage}
//                         changeMessage={changeMessage}
//                         dialogsData={localState.dialogsData}
//                         messagesData={localState.messagesData}
//                         newMessageBody={localState.newMessageBody} />
//                 }
//             }
//         </StoreContext.Consumer>
//     )
// }

const mapStateToProps = (state: AppStateType): mapStateToPropsType => (
    {
        dialogsData: state.dialogsPage.dialogsData,
        messagesData: state.dialogsPage.messagesData,
    }
)

const mapDispatchToProps = (dispatch: Dispatch): mapDispatchToPropsType => (
    {
        sendMessage: (newMessageBody: string) => dispatch(sendMessageAC(newMessageBody)),
    }
)

export default compose<React.ComponentType>(
    connect(mapStateToProps, mapDispatchToProps),
    WithAuthRedirect
)(Dialogs)

//types
type mapStateToPropsType = {
    dialogsData: DialogType[]
    messagesData: MessageType[]
}
type mapDispatchToPropsType = {
    sendMessage: (newMessageBody: string) => void
}
export type DialogsPropsType = mapStateToPropsType & mapDispatchToPropsType