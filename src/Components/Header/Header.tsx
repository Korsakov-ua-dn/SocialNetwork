import React from 'react'
import {NavLink} from 'react-router-dom'
import s from './Header.module.css'
import {HeaderContainerPropsType} from './HeaderContainer'

const Header = (props: HeaderContainerPropsType) => {
    return (
        <header className={s.header}>
            <img
                src="https://res.cloudinary.com/teepublic/image/private/s--iRHIjqP9--/t_Preview/b_rgb:191919,c_limit,f_auto,h_630,q_90,w_630/v1463168513/production/designs/511305_1.jpg"
                alt=""/>
            <div className={s.loginBlock}>
                {
                    props.auth.isAuth
                        ? <div>{props.auth.login} - <button onClick={props.logout}>Log out</button></div>
                        : <NavLink to={'/login'}>Login</NavLink>
                }

            </div>
        </header>
    )
}

export default Header;
