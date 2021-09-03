import React from 'react'
import {Field, reduxForm, InjectedFormProps} from 'redux-form'
import {required} from '../../utils/validator'
import {Input} from '../common/FormsControls/FormsControls'
import {connect} from "react-redux";
import {AuthType, login} from "../../Redux/auth-reducer";
import {AppStateType} from "../../Redux/redux-store";
import {Redirect} from "react-router-dom";

type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
}

const LoginForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit} action="">
            <div>
                <Field name={"email"} component={Input} validate={[required]} type="text" placeholder={"Login"}/>
            </div>
            <div>
                <Field name={"password"} component={Input} validate={[required]} type="password" placeholder={"Password"}/>
            </div>
            <div>
                <Field name={"rememberMe"} component={Input} type="checkbox"/> remember me
            </div>
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm<FormDataType>({form: 'login'})(LoginForm)

const LoginContainer: React.FC<LoginContainerPropsType> = (props) => {
    const submit = (formData: FormDataType) => {
        console.log(formData)
        props.login(formData.email, formData.password, formData.rememberMe)
    }

    if(props.auth.isAuth) return <Redirect to={"/Profile"}/>

    return <div>
        <h1> Login </h1>
        <LoginReduxForm onSubmit={submit}/>
    </div>
}

// types
type mapStateToPropsType = {auth: AuthType}
type mapDispatchToPropsType = {login: (email: string, password: string, rememberMe: boolean) => void}
type LoginContainerPropsType = mapStateToPropsType & mapDispatchToPropsType


const mapStateToProps = (state: AppStateType): mapStateToPropsType => ({auth: state.auth})

export default connect(mapStateToProps, {login})(LoginContainer)