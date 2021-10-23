import React, { useState } from 'react';
// import s from './ProfileInfo.module.css';

type ProfileStatusPropsType = {
    status: string
    updateUserStatus: (status: string) => void
}

const ProfileStatusHooks: React.FC<ProfileStatusPropsType> = ({status, updateUserStatus}) => {

    const [editMode, setEditMode] = useState<boolean>(false)
    const [localValue, setLocalValue] = useState<string>(status)
    
    const activateEditMode = () => {
        setEditMode(true)
    }
    const activateViewMode = () => {
        setEditMode(false)
        updateUserStatus(localValue)
    }
    const onStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalValue(e.currentTarget.value)
    }

    // componentDidUpdate(prevProps: ProfileStatusPropsType, prevState: StateType) {
    //     if(prevProps.status !== this.props.status) {
    //         this.setState({
    //             status: this.props.status
    //         })
    //     }
    // } // пофиксили багу с отображением данных в инпуте
    // // (в ProfileContainer два запроса на сервер и данные могут приходить в разной поседовательности) Lesson 74

    return (
        <div className={''}>
            {!editMode &&
                <div>
                    <span onDoubleClick={activateEditMode}>{status || "status is not defined"}</span>
                </div>
            }
            {editMode && 
                <div>
                    <input autoFocus onBlur={activateViewMode} 
                            onChange={onStatusChange}
                            value={localValue} type="text" />
                </div>
            }
        </div>
    )
}

export default ProfileStatusHooks;