import React from 'react'
import s from './Dialogs.module.css'
import DialogItem from './DialogItem/DialogItem'
import Message from './Message/Message'

const Dialogs = () => {

    let dialogsData = [
        {id: 1, name: 'Oleg'},
        {id: 2, name: 'Andrey'},
        {id: 3, name: 'Vadim'},
        {id: 4, name: 'Konstantin'},
        {id: 5, name: 'Stepan'}
    ]

    let messagesData = [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'How are your Kamasutra?'},
        {id: 3, message: 'Yo bro, is good'}
    ]

    let dialogItems = dialogsData.map( dialog => <DialogItem name={dialog.name} id={dialog.id}/>)
    let messageItems = messagesData.map( m => <Message message={m.message} id={m.id}/>)

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