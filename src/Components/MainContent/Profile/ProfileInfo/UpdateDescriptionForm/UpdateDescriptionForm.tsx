import React, {useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import s from "../ProfileInfo.module.css";
import cn from "classnames";
import {ContactType, ProfileType} from "../../../../../API/api";

type PropsType = {
    profile: ProfileType
    goToEditMode: () => void
    updateDescription: (data: DescriptionDataType) => Promise<any>
}
export const UpdateDescriptionForm: React.FC<PropsType> = (
    {
        profile,
        goToEditMode,
        updateDescription
    }
) => {
    const [error, setError] = useState(null)
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
            .then(() => goToEditMode())
            .catch((err) => setError(err))
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={s.description}>
            <div className={s.element}>
                <span>Full Name</span>
                <b>
                    <input placeholder={"full name"} {...register("fullName",
                    {
                        required: true
                    } ) } />
                    {errors.fullName?.type === "required" && <span>Field is required</span>}
                </b>
            </div>
            <div className={s.element}>
                <span>looking for a job</span>
                <b><input type={"checkbox"} {...register("lookingForAJob")}/></b>
            </div>
            <div className={s.element}>
                <span>Job description:</span>
                <b><textarea placeholder={"job description"} {...register("lookingForAJobDescription",
                    {
                        required: true
                    }
                )}/>
                    {errors.lookingForAJobDescription?.type === "required" && <span>Field is required</span>}
                </b>
            </div>
            <div className={s.element}>
                <span>about me</span>
                <b><textarea placeholder={"about me"} {...register("aboutMe",
                    {
                        required: true
                    })}/>
                    {errors.aboutMe?.type === "required" && <span>Field is required</span>}
                </b>
            </div>
            <div className={ cn(s.element, s.contacts) }>
                <span>contacts</span><br/>
                <b>
                    {Object.keys(profile.contacts).map(key => {
                        return (
                            <div key={key}>
                                <input placeholder={key} {...register(`contacts.${key as keyof ContactType}`)}/>
                            </div>
                        )
                    })}
                </b>
            </div>
            <input className={s.btn} type="submit" value={"send"}/>
            {error && <span style={{color: "red", margin: "0 auto"}}>{error}</span>}
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