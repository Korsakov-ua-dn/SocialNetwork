import React from 'react';
import s from './Nav.module.css';

const Nav = () => {
    return (
        <nav className={s.nav}>
            <div className={`${s.item} ${s.active}`}>
                <div>Profile</div>
            </div>
            <div className={s.item}>
                <div>Messages</div>
            </div>
            <div className={s.item}>
                <div>News</div>
            </div>
            <div className={s.item}>
                <div>Music</div>
            </div>
            <div className={s.item}>
                <div>Settings</div>
            </div>
        </nav>
    )
}

export default Nav;