import React, {ChangeEvent, useState} from 'react'
import Preloader from '../../../common/Preloader/Preloader'
import s from './ProfileInfo.module.css'
import ProfileStatusHooks from './ProfileStatusHooks'
import {ProfileContainerPropsType} from '../ProfileContainer'
import {AddPropsType} from '../Profile'
import {UpdateDescriptionForm} from "./UpdateDescriptionForm/UpdateDescriptionForm";
import {ProfileDescription} from "./ProfileDescription/ProfileDescription";

const ProfileInfo: React.FC<ProfileContainerPropsType & AddPropsType> = (
    {
        updateAvatar,
        profile,
        status,
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
                <div className={s.avaWrapper}>
                    <div style={avatarStyle} className={s.ava_img}>
                    {
                        isOwner &&
                        <>
                            <input className={s.uploadInput} type={"file"} onChange={addAvatar}/>
                            <label className={s.uploadLabel}> </label>
                        </>
                }
                    </div>
                </div>
                <div className={s.description}>
                    <b><ProfileStatusHooks status={status} updateUserStatus={updateUserStatus}/></b>
                    {
                        editMode
                            ? <UpdateDescriptionForm profile={profile} updateDescription={updateDescription}
                                                     goToEditMode={() => setEditMode(false)}/>
                            : <ProfileDescription profile={profile} isOwner={isOwner}
                                                  goToEditMode={() => setEditMode(true)}/>
                    }

                </div>
            </div>
        )
    }
}

export default ProfileInfo