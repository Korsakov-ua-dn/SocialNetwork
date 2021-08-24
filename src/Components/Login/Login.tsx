import React from 'react'
import { Field, reduxForm, InjectedFormProps} from 'redux-form'

type FormDataType = {
    login: string
    password: string
    rememberMe: boolean
}

const LoginForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit} action="">
            <div>
                <Field name={"Login"} component="input" type="text" placeholder={"Login"} />
            </div>
            <div>
                <Field name={"Password"} component="input" type="text" placeholder={"Password"} />
            </div>
            <div>
                <Field name={"remember me"} component="input" type="checkbox" /> remember me
            </div>
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm<FormDataType>({form: 'login'})(LoginForm)

const LoginContainer = () => {

    const submit = (formData: FormDataType ) => {
        console.log(formData)
    }

    return <div>
        <h1> Login </h1>
        <LoginReduxForm onSubmit={submit}/>
    </div>
}

export default LoginContainer