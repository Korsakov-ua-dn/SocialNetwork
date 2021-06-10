import React from 'react'
import s from './Dialogs.module.css'
import DialogItem from './DialogItem/DialogItem'
import Message from './Message/Message'

import { DialogItemType, MessageItem } from '../../../Redux/state';

type DialogsPropsType = {
    dialogsData: Array<DialogItemType>
    messagesData: Array<MessageItem>
}


const Dialogs = (props: DialogsPropsType) => {

    let dialogItems = props.dialogsData.map( dialog => <DialogItem name={dialog.name} id={dialog.id}/>)
    let messageItems = props.messagesData.map( m => <Message message={m.message} id={m.id}/>)

    return (
        <div className={s.dialogs}>
            <div className={s.dialogItems}>
                { dialogItems }
            </div>
            <div className={s.messages}>
                { messageItems }
            </div>
        </div>
    )
}

export default Dialogs