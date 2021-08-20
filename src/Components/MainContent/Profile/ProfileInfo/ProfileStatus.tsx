import React from 'react';
import s from './ProfileInfo.module.css';

type ProfileStatusPropsType = {
    status: string
}

class ProfileStatus extends React.Component<ProfileStatusPropsType> {

    state = {
        editMode: false
    }

    activateEditMode() {
        this.setState({editMode: true})
    }
    activateViewMode = () => {
        debugger
        this.setState({editMode: false})
    }

    render() {
        return (
            <div className={''}>
                {!this.state.editMode &&
                    <div>
                        <span onDoubleClick={this.activateEditMode.bind(this)}>{this.props.status}</span>
                    </div>
                }
                {this.state.editMode && 
                    <div>
                        <input autoFocus onBlur={this.activateViewMode} value={this.props.status} type="text" />
                    </div>
                }
            </div>
        )
    }
}

export default ProfileStatus;