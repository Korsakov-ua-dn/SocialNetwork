import React from 'react';
// import s from './ProfileInfo.module.css';

type ProfileStatusPropsType = {
    status: string
    updateUserStatus: (status: string) => void
}
type StateType = {
    editMode: boolean
    status: string
}

class ProfileStatus extends React.Component<ProfileStatusPropsType> {

    state = {
        editMode: false,
        status: this.props.status
    }

    activateEditMode() {
        this.setState({editMode: true})
    }
    activateViewMode = () => {
        this.setState({editMode: false})
        this.props.updateUserStatus(this.state.status)
    }
    onStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            status: e.currentTarget.value
        })
    }

    componentDidUpdate(prevProps: ProfileStatusPropsType, prevState: StateType) {
        if(prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            })
        }
    } // пофиксили багу с отображением данных в инпуте 
    // (в ProfileContainer два запроса на сервер и данные могут приходить в разной поседовательности) Lesson 74

    render() {
        return (
            <div className={''}>
                {!this.state.editMode &&
                    <div>
                        <span onDoubleClick={this.activateEditMode.bind(this)}>{this.props.status || "status is not defined"}</span>
                    </div>
                }
                {this.state.editMode && 
                    <div>
                        <input autoFocus onBlur={this.activateViewMode} 
                                onChange={this.onStatusChange}
                                value={this.state.status} type="text" />
                    </div>
                }
            </div>
        )
    }
}

export default ProfileStatus;