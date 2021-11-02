import React from 'react'
import {connect} from "react-redux";
import {AuthType, login} from "../../Redux/auth-reducer";
import {AppStateType} from "../../Redux/redux-store";
import {Redirect} from "react-router-dom";
import { SubmitHandler, useForm } from 'react-hook-form';

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
    const { register, handleSubmit, formState: { errors } } = useForm<FormDataType>();
    const onSubmit: SubmitHandler<FormDataType> = data => props.login(data.email, data.password, data.rememberMe, data.captcha)
    const onError = (errors: any, e: any) => console.log(errors, e);

    return (
        <form onSubmit={handleSubmit(onSubmit, onError)}>
            <div>
                <label>{"email"}</label>
                <input  {...register("email", { required: true })} />
                {errors.email && <span>email is required</span>}
            </div>

            <div>
                <label>{"password"}</label>
                <input type={"password"} {...register("password", { required: true })} />
                {errors.password && <span>password is required</span>}
            </div>

            <div>
                <label>{"remember me"}</label>
                <input type={"checkbox"} {...register("rememberMe")} />
            </div>
            {props.captchaUrl && <div>
                <label>{"anti-bot symbols"}</label>
                <input  {...register("captcha", { required: true })} />
                {errors.captcha && <span>field is required</span>}
            </div>}
            
            <input type="submit" />
            {props.captchaUrl && <img src={props.captchaUrl} alt="captcha"/>}
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

    if(props.auth.isAuth) return <Redirect to={"/Profile"}/>
    
    return <div>
        <div style={{color: "red"}}>{props.auth.error.length ? props.auth.error : null}</div>
        <h1> Login </h1>
        <LoginForm login={props.login} captchaUrl={props.auth.captchaUrl} />
    </div>
}

// types
type mapStateToPropsType = {auth: AuthType}
type mapDispatchToPropsType = {login: (email: string, password: string, rememberMe: boolean, captcha: string) => void}
type LoginContainerPropsType = mapStateToPropsType & mapDispatchToPropsType


const mapStateToProps = (state: AppStateType): mapStateToPropsType => ({auth: state.auth})

export default connect(mapStateToProps, {login})(LoginContainer)