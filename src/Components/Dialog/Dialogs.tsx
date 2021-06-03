import { type } from 'os'
import React from 'react'
import { NavLink } from 'react-router-dom'
import s from './Dialogs.module.css'

type DialogItemPropsType = {
    name: string
    id: number
}
type MesagePropsType = {
    message: string
}

const DialogItem = (props: DialogItemPropsType) => {

    let path = `/dialogs/${props.id}`

    return (
        <div className={s.dialog + ' ' + s.active}>
            <NavLink to={path}>{props.name}</NavLink>
        </div>
    )
}

const Message = (props: MesagePropsType) => {
    return (
        <div className={s.message}>{props.message}</div>
    )
}

const Dialogs = () => {
    return (
        <div className={s.dialogs}>
            <div className={s.dialogItems}>
                <DialogItem name='Oleg' id={1}/>
                <DialogItem name='Andrey' id={2}/>
                <DialogItem name='Vadim' id={3}/>
                <DialogItem name='Konstantin' id={4}/>
                <DialogItem name='Stepan' id={5}/>
            </div>
            <div className={s.messages}>
                <Message message='Hi'/>
                <Message message='How are your Kamasutra?'/>
                <Message message='Yo bro, is good'/>
            </div>
        </div>
    )
}

export default Dialogs