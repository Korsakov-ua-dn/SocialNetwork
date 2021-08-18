import React, {ChangeEvent} from 'react'
import s from './Dialogs.module.css'
import DialogItem from './DialogItem/DialogItem'
import Message from './Message/Message'
import {DialogsPropsType} from './DialogsContainer';
import { Redirect } from 'react-router-dom';

const Dialogs = (props: DialogsPropsType) => {

    if (!props.isAuth) return <Redirect to='/login'/>

    let dialogItems = props.dialogsData.map(dialog => <DialogItem name={dialog.name} key={dialog.id} id={dialog.id}/>)
    let messageItems = props.messagesData.map(m => <Message message={m.message} key={m.id} id={m.id}/>)

    const onSendMessageHandler = () => {
        props.sendMessage()
    }
    const onChangeMessageHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let body = e.target.value
        props.changeMessage(body)
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogItems}>
                {dialogItems}
            </div>
            <div className={s.messages}>
                <div>{messageItems}</div>
                <div className={s.sendWrapper}>
                    <div><textarea
                        value={props.newMessageBody}
                        placeholder='Enter message'
                        onChange={onChangeMessageHandler}/>
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