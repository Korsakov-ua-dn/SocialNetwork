import React from 'react'
import {connect} from "react-redux"
import {AuthType, login} from "../../Redux/auth-reducer"
import {AppStateType} from "../../Redux/store"
import {Redirect} from "react-router-dom"
import {SubmitHandler, useForm} from 'react-hook-form'
import s from './Login.module.css'
import cn from "classnames"

type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}

type LoginFormPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string) => void
    captchaUrl: string | null
}

export const LoginForm: React.FC<LoginFormPropsType> = (props) => {
    const {register, handleSubmit, formState: {errors}} = useForm<FormDataType>();
    const onSubmit: SubmitHandler<FormDataType> = data => props.login(data.email, data.password, data.rememberMe, data.captcha)
    const onError = (errors: any, e: any) => console.log(errors, e);

    return (
        <form className={s.form} onSubmit={handleSubmit(onSubmit, onError)}>
            <div className={s.item}>
                <span>{"email"}</span>
                <input  {...register("email", {required: true})} />
                {errors.email && <span>email is required</span>}
            </div>
            <div className={s.item}>
                <span>{"password"}</span>
                <input type={"password"} {...register("password", {required: true})} />
                {errors.password && <span>password is required</span>}
            </div>
            <div className={s.item}>
                <span>{"remember me"}</span>
                <input className={s.checkbox} type={"checkbox"} {...register("rememberMe")} />
            </div>
            {props.captchaUrl && <div className={s.item}>
                <span>{"anti-bot symbols"}</span>
                <input {...register("captcha", {required: true})}
                       className={cn(s.inputCaptcha, {[s.errorCaptcha]: errors.captcha})}/>
            </div>}

            <input className={s.btnSubmit} type="submit"/>
            {props.captchaUrl && <img className={s.captchaImg} src={props.captchaUrl} alt="captcha"/>}
        </form>
    );
}

// const LoginForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
//     return (
//         <form onSubmit={props.handleSubmit} action="">
//             <div>
//                 <Field name={"email"} component={Input} validate={[required]} type="text" placeholder={"Login"}/>
//             </div>
//             <div>
//                 <Field name={"password"} component={Input} validate={[required]} type="password" placeholder={"Password"}/>
//             </div>
//             <div>
//                 <Field name={"rememberMe"} component={Input} type="checkbox"/> remember me
//             </div>
//             <div>
//                 <button>Login</button>
//             </div>
//         </form>
//     )
// }
// const LoginReduxForm = reduxForm<FormDataType>({form: 'login'})(LoginForm)

const LoginContainer: React.FC<LoginContainerPropsType> = (props) => {
    if (props.auth.isAuth) return <Redirect to={"/Profile"}/>

    return <div className={s.loginWrapper}>
        <h1> Login </h1>
        <LoginForm login={props.login} captchaUrl={props.auth.captchaUrl}/>
        <div style={{color: "red"}}>{!!props.auth.error ? props.auth.error : null}</div>
    </div>
}

// types
type mapStateToPropsType = { auth: AuthType }
type mapDispatchToPropsType = { login: (email: string, password: string, rememberMe: boolean, captcha: string) => void }
type LoginContainerPropsType = mapStateToPropsType & mapDispatchToPropsType


const mapStateToProps = (state: AppStateType): mapStateToPropsType => ({auth: state.auth})

export default connect(mapStateToProps, {login})(LoginContainer)