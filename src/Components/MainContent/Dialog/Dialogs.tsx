import React, {ChangeEvent} from 'react'
import s from './Dialogs.module.css'
import DialogItem from './DialogItem/DialogItem'
import Message from './Message/Message'
import {DialogsPropsType} from './DialogsContainer'
import { InjectedFormProps, Field, reduxForm } from 'redux-form'
import { Textarea } from '../../common/FormsControls/FormsControls'
import { required, maxLengthCreator } from '../../../utils/validator'

const maxLength50 = maxLengthCreator(100)

type FormDataType = {
    newMessageBody: string
}

const DialogsForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit} className={s.sendWrapper}>
            <Field 
                component={Textarea}
                validate={[required, maxLength50]}
                name="newMessageBody"
                placeholder='Enter message'/>
            <button>send</button>
        </form>
    )
}

const DialogsMessageReduxForm = reduxForm<FormDataType>({form: "DialogsMessage"})(DialogsForm)

const Dialogs = (props: DialogsPropsType) => {

    let dialogItems = props.dialogsData.map(dialog => <DialogItem name={dialog.name} key={dialog.id} id={dialog.id}/>)
    let messageItems = props.messagesData.map(m => <Message message={m.message} key={m.id} id={m.id}/>)

    const submit = (DialogsForm: FormDataType) => {
        console.log(DialogsForm)
        props.sendMessage(DialogsForm.newMessageBody)
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogItems}>
                {dialogItems}
            </div>
            <div className={s.messages}>
                <div>{messageItems}</div>
                <DialogsMessageReduxForm onSubmit={submit}/>
            </div>
        </div>
    )
}

export default Dialogs