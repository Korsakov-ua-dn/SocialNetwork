import React from 'react'
import {NavLink} from 'react-router-dom'
import s from '../Dialogs.module.css'
import avatar from "../../../../assets/img/null-avatar-icon.png";

type DialogItemPropsType = {
    name: string
    id: number
}

const DialogItem = (props: DialogItemPropsType) => {

    let path = `/dialogs/${props.id}`

    return (
        <div className={s.dialog + ' ' + s.active}>
            <div className={s.avatar}>
                <img src={avatar} alt="userAvatar"/>
            </div>
            <NavLink to={path}>{props.name}</NavLink>
        </div>
    )
}

export default DialogItem   