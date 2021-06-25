import React from 'react'
import s from './Dialogs.module.css'
import DialogItem from './DialogItem/DialogItem'
import Message from './Message/Message'

import { DialogPageType } from '../../../Redux/state';

type DialogsPropsType = {
    dialogsPage: DialogPageType
}


const Dialogs = (props: DialogsPropsType) => {

    let dialogItems = props.dialogsPage.dialogsData.map( dialog => <DialogItem name={dialog.name} id={dialog.id}/>)
    let messageItems = props.dialogsPage.messagesData.map( m => <Message message={m.message} id={m.id}/>)

    let newMessageRef = React.createRef<HTMLTextAreaElement>()
    const sendMessage = () => {
        if (newMessageRef.current) {
            alert(newMessageRef.current.value)
        }
    }


    return (
        <div className={s.dialogs}>
            <div className={s.dialogItems}>
                { dialogItems }
            </div>
            <div className={s.messages}>
                { messageItems }
                <div className={s.sendWrapper}>
                    <textarea ref={newMessageRef}/><button onClick={sendMessage}>send</button>
                </div>
            </div>
        </div>
    )
}

export default Dialogs