import React, { ChangeEvent } from 'react'
import s from './Dialogs.module.css'
import DialogItem from './DialogItem/DialogItem'
import Message from './Message/Message'

import { StoreType, changeMessageBodyAC, sendMessageAC } from '../../../Redux/state';

type DialogsPropsType = {
    store: StoreType
}

const Dialogs = (props: DialogsPropsType) => {

    let localState = props.store.getState().dialogsPage

    let dialogItems = localState.dialogsData.map( dialog => <DialogItem name={dialog.name} id={dialog.id}/>)
    let messageItems = localState.messagesData.map( m => <Message message={m.message} id={m.id}/>)

    const onSendMessageHandler = () => {
        props.store.dispatch(sendMessageAC())
    }
    const onChangeMessageHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let body = e.target.value
        props.store.dispatch(changeMessageBodyAC(body))
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogItems}>
                { dialogItems }
            </div>
            <div className={s.messages}>
                <div>{ messageItems }</div>
                <div className={s.sendWrapper}>
                    <div><textarea
                        value={localState.newMessageBody}
                        placeholder='Enter message'
                        onChange={onChangeMessageHandler} />
                    </div>
                    <div>
                        <button onClick={onSendMessageHandler}>send</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dialogs