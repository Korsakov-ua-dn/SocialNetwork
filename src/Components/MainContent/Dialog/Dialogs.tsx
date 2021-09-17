import React from 'react'
import s from './Dialogs.module.css'
import DialogItem from './DialogItem/DialogItem'
import Message from './Message/Message'
import {DialogsPropsType} from './DialogsContainer'
import { SubmitHandler, useForm } from 'react-hook-form'

type FormDataType = {
    newMessageBody: string
}
type PropsType = {
    sendMessage: (newMessageBody: string) => void
}

const DialogsForm: React.FC<PropsType> = (props) => {

    const { register, handleSubmit, formState: { errors } } = useForm<FormDataType>();
    const onSubmit: SubmitHandler<FormDataType> = data => props.sendMessage(data.newMessageBody)

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={s.sendWrapper}>
            <div>
                <textarea 
                    {...register("newMessageBody", 
                        { 
                            required: true,
                            maxLength : {
                                value: 10,
                                message: 'max length 10'
                            } 
                        })
                    }
                    placeholder='Enter message'/>
                <input type="submit" value={"send"} />
            </div>
            {errors.newMessageBody?.type === "required" && <span>Field is required</span>}
            {errors.newMessageBody?.message && <span>{errors.newMessageBody.message}</span>}
        </form>
    )
}

const Dialogs = (props: DialogsPropsType) => {

    let dialogItems = props.dialogsData.map(dialog => <DialogItem name={dialog.name} key={dialog.id} id={dialog.id}/>)
    let messageItems = props.messagesData.map(m => <Message message={m.message} key={m.id} id={m.id}/>)

    return (
        <div className={s.dialogs}>
            <div className={s.dialogItems}>
                {dialogItems}
            </div>
            <div className={s.messages}>
                <div>{messageItems}</div>
                <DialogsForm sendMessage={props.sendMessage}/>
            </div>
        </div>
    )
}

export default Dialogs