import Dialogs from './Dialogs'
import { AppStoreType} from '../../../Redux/redux-store';
import { dialogsActions } from '../../../Redux/dialogs-reducer';

type DialogsPropsType = {
    store: AppStoreType
}

const DialogsContainer = (props: DialogsPropsType) => {

    let localState = props.store.getState().dialogsPage

    const sendMessage = () => {
        props.store.dispatch(dialogsActions.sendMessageAC())
    }
    const changeMessage = (body: string) => {
        props.store.dispatch(dialogsActions.changeMessageBodyAC(body))
    }

    return <Dialogs 
            sendMessage={sendMessage}
            changeMessage={changeMessage}
            dialogsData={localState.dialogsData}
            messagesData={localState.messagesData}
            newMessageBody={localState.newMessageBody} />
}

export default DialogsContainer