import style from './FormsControls.module.css'
import {WrappedFieldInputProps, WrappedFieldMetaProps} from 'redux-form/lib/Field';


type FormControlPropsType = {
    input: WrappedFieldInputProps
    meta: WrappedFieldMetaProps
    placeholder: string
    child: React.ReactNode
}

export const FormControl: React.FC<FormControlPropsType> = ({input, meta, child, ...props}) => {

    const isError = meta.error && meta.touched

    return (
        <div className={style.formsControls + " " + (isError ? style.error : "")}>
            <div>{props.children}</div>
            {isError && <span>{meta.error}</span>}
        </div>
    )
}

export const Textarea: React.FC<FormControlPropsType> = (props) => {
    const {input, meta, children, ...restProps} = props
    return <FormControl {...props}><textarea {...input} {...restProps}/></FormControl> 
}
export const Input: React.FC<FormControlPropsType> = (props) => {
    const {input, meta, children, ...restProps} = props
    return <FormControl {...props}><input {...input} {...restProps}/></FormControl> 
}