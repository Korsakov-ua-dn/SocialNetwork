import Dialogs from './Dialogs'
import {AppStateType} from '../../../Redux/redux-store';
import {dialogsActions, DialogType, MessageType} from '../../../Redux/dialogs-reducer'
import {compose, Dispatch} from 'redux'
import {connect} from 'react-redux'
import {WithAuthRedirect} from '../../../hoc/withAuthRedirect'

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

type mapStateToPropsType = {
    dialogsData: DialogType[]
    messagesData: MessageType[]
    newMessageBody: string
}
type mapDispatchToPropsType = {
    sendMessage: () => void
    changeMessage: (body: string) => void
}
export type DialogsPropsType = mapStateToPropsType & mapDispatchToPropsType

let mapStateToProps = (state: AppStateType): mapStateToPropsType => {
    return (
        {
            dialogsData: state.dialogsPage.dialogsData,
            messagesData: state.dialogsPage.messagesData,
            newMessageBody: state.dialogsPage.newMessageBody,
        }
    )
}
let mapDispatchToProps = (dispatch: Dispatch): mapDispatchToPropsType => {
    return (
        {
            sendMessage: () => dispatch(dialogsActions.sendMessageAC()),
            changeMessage: (body: string) => dispatch(dialogsActions.changeMessageBodyAC(body)),
        }
    )
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, mapDispatchToProps),
    WithAuthRedirect
)(Dialogs)