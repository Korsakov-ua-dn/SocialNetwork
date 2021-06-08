import React from 'react'
import s from '../Dialogs.module.css'

type MesagePropsType = {
    message: string
    id: number
}

const Message = (props: MesagePropsType) => {
    return (
        <div className={s.message}>{props.message}</div>
    )
}

export default Message