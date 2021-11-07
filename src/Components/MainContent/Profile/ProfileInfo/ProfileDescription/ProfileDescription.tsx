import React from "react";
import s from "../ProfileInfo.module.css";
import {ContactType, ProfileType} from "../../../../../API/api";

type ProfileDescriptionType = {
    profile: ProfileType
    isOwner: boolean
    goToEditMode: () => void
}
export const ProfileDescription: React.FC<ProfileDescriptionType> = (
    {
        profile,
        isOwner,
        goToEditMode
    }
) => {
    return (
        <>
            <div className={s.fullName}>
                <h3>{profile?.fullName}</h3>
                {isOwner && <button onClick={goToEditMode}>Edit profile</button>}
            </div>
            <span className={s.opentowork}><b>{profile?.lookingForAJob ? "Open to work" : null}</b></span>
            <hr/>
            <div className={s.element}>
                <span>Job description:</span><b>{profile?.lookingForAJobDescription}</b>
            </div>
            <hr/>
            <div className={s.element}>
                <span>About Me:</span><b>{profile?.aboutMe}</b>
            </div>
            <hr/>
            <div className={s.element}>
                <span>Contacts:</span>
                <b>{Object.keys(profile.contacts).map(key => {
                    return <Contact key={key} title={key} value={profile.contacts[key as keyof ContactType]}/>
                })}</b>
            </div>

        </>
    )
}

type ContactPropsType = {
    title: string
    value: string | null
}
const Contact: React.FC<ContactPropsType> = ({title, value}) => {
    return (
        <div style={value ? {display: "block"} : {display: "none"}}>
            <b>{title}: </b>{value}
        </div>
    )
}