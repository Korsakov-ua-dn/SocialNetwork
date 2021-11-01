import React, {ChangeEvent, useState} from 'react'
import Preloader from '../../../common/Preloader/Preloader'
import s from './ProfileInfo.module.css'
import ProfileStatusHooks from './ProfileStatusHooks'
import {ProfileContainerPropsType} from '../ProfileContainer'
import {AddPropsType} from '../Profile'
import {ContactType, ProfileType} from "../../../../Redux/profile-reducer";
import {SubmitHandler, useForm} from "react-hook-form";

const ProfileInfo: React.FC<ProfileContainerPropsType & AddPropsType> = (
    {
        updateAvatar,
        profile,
        status,
        error,
        updateUserStatus,
        updateDescription,
        isOwner,
    }
) => {
    const [editMode, setEditMode] = useState<boolean>(false)

    const addAvatar = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files)
            updateAvatar(e.target.files[0])
    }

    let photo;

    if (!profile) {
        return <Preloader isFetching/>
    } else {
        photo = profile.photos.large
        const avatarStyle = {
            backgroundImage: photo
                ? `url(${photo})`
                : "url('https://avatars.mds.yandex.net/get-zen_doc/1570751/pub_5fa2a2525dc59845ddab2eb2_5fa2a4ab5dfc942ad768ab44/scale_1200')"
        }

        return (
            <div className={s.personal_wrapper}>
                <div style={avatarStyle} className={s.ava_img}/>
                {isOwner && <input type={"file"} onChange={addAvatar}/>}
                <div className={s.description}>
                    {
                        editMode
                            ? <ProfileForm profile={profile} updateDescription={updateDescription}
                                           goToEditMode={() => setEditMode(false)}/>
                            : <ProfileData profile={profile} isOwner={isOwner} error={error}
                                           goToEditMode={() => setEditMode(true)}/>
                    }
                    <b><ProfileStatusHooks status={status} updateUserStatus={updateUserStatus}/></b>
                </div>
            </div>
        )
    }
}

type ProfileDataType = {
    profile: ProfileType
    isOwner: boolean
    error: string
    goToEditMode: () => void
}
const ProfileData: React.FC<ProfileDataType> = ({profile, isOwner, error, goToEditMode}) => {
    return (
        <>
            {isOwner && <button onClick={goToEditMode}>edit</button>}
            <h3>{profile?.fullName}</h3>
            <span><b>Open to work: </b>{profile?.lookingForAJob ? "Yes" : "No"}</span>
            <span><b>job description: </b>{profile?.lookingForAJobDescription}</span>
            <span><b>aboutMe: </b>{profile?.aboutMe}</span>
            <span><b>Contacts: </b>{Object.keys(profile.contacts).map(key => {
                return <Contact key={key} title={key} value={profile.contacts[key as keyof ContactType]}/>
            } )}</span>
            {error && <span>{error}</span>}
        </>
    )
}

type ContactPropsType = {
    title: string
    value: string | null
}
const Contact: React.FC<ContactPropsType> = ({title, value}) => {
    return (
        <div>
            <b>{title}: </b>{value}
        </div>
    )
}

type ProfileFormType = {
    profile: ProfileType
    goToEditMode: () => void
    updateDescription: (data: DescriptionDataType) => void
}
const ProfileForm: React.FC<ProfileFormType> = ({profile, goToEditMode, updateDescription}) => {
    const {register, handleSubmit, formState: {errors}} = useForm<DescriptionDataType>({
        defaultValues: {
            fullName: profile.fullName,
            lookingForAJob: profile.lookingForAJob,
            lookingForAJobDescription: profile.lookingForAJobDescription,
            aboutMe: profile.aboutMe,
            contacts: {
                facebook: profile.contacts.facebook,
                github: profile.contacts.github,
                instagram: profile.contacts.instagram,
                mainLink: profile.contacts.mainLink,
                twitter: profile.contacts.twitter,
                vk: profile.contacts.vk,
                website: profile.contacts.website,
                youtube: profile.contacts.youtube,
            }
        }
    })
    const onSubmit: SubmitHandler<DescriptionDataType> = data => {
        updateDescription(data)
        goToEditMode()
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={s.description}>
            <div>
                <label>Full Name</label>
                <input placeholder={"full name"} {...register("fullName",
                    {
                        required: true
                    }
                )}/>
                {errors.fullName?.type === "required" && <span>Field is required</span>}
            </div>
            <div>
                <label>looking for a job</label>
                <input type={"checkbox"} {...register("lookingForAJob")}/>
            </div>
            <div>
                <label>looking for a job description</label>
                <textarea placeholder={"job description"} {...register("lookingForAJobDescription",
                    {
                        required: true
                    }
                )}/>
                {errors.lookingForAJobDescription?.type === "required" && <span>Field is required</span>}
            </div>
            <div>
                <label>about me</label>
                <textarea placeholder={"about me"} {...register("aboutMe",
                    {
                        required: true
                    })}/>
                {errors.aboutMe?.type === "required" && <span>Field is required</span>}
            </div>
            <div>
                <label>contacts</label><br/>
                {Object.keys(profile.contacts).map( key => {
                    return (
                        <div key={key}>
                            <input placeholder={key} {...register(`contacts.${key as keyof ContactType}`)}/>
                        </div>
                    )
                })}
            </div>
            <input type="submit" value={"send"}/>
        </form>
    )
}
export type DescriptionDataType = {
    aboutMe: string | null
    lookingForAJob: boolean
    lookingForAJobDescription: string | null
    fullName: string
    contacts: ContactType
}

export default ProfileInfo