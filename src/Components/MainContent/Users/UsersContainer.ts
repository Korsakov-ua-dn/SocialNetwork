import {connect} from "react-redux";
import Users from "./Users";
import {AppStateType} from "../../../Redux/redux-store";
import {Dispatch} from "redux";
import {UserDataType, usersActions} from "../../../Redux/users-reducer";

type mapStateToPropsType = {
    users: Array<UserDataType>
}
type mapDispatchToPropsType = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setUsers: (users: Array<UserDataType>) => void
}
export type UsersPropsType = mapStateToPropsType & mapDispatchToPropsType

const mapStateToProps = (state: AppStateType): mapStateToPropsType => {
    return {
        users: state.usersPage.users
    }
}

const mapDispatchToProps = (dispatch: Dispatch): mapDispatchToPropsType => {
    return {
        follow: (userId: number) => dispatch(usersActions.followAC(userId)),
        unfollow: (userId: number) => dispatch(usersActions.unfollowAC(userId)),
        setUsers: (users: Array<UserDataType>) => dispatch(usersActions.setUsersAC(users))
    }
}

const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users)

export default UsersContainer