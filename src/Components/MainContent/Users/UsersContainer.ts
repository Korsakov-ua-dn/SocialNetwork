import {connect} from "react-redux";
import Users from "./Users";
import {AppStateType} from "../../../Redux/redux-store";
import {Dispatch} from "redux";
import {UserDataType, usersActions, UsersPageType} from "../../../Redux/users-reducer";

type mapStatePropsType = {
    usersPage:  UsersPageType
}
type mapDispatchPropsType = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setUsers: (users: Array<UserDataType>) => void
}
export type UsersPropsType = mapStatePropsType & mapDispatchPropsType

const mapStateToProps = (state: AppStateType): mapStatePropsType => {
    return {
        usersPage: state.usersPage
    }
}

const mapDispatchToProps = (dispatch: Dispatch): mapDispatchPropsType => {
    return {
        follow: (userId: number) => dispatch(usersActions.followAC(userId)),
        unfollow: (userId: number) => dispatch(usersActions.unfollowAC(userId)),
        setUsers: (users: Array<UserDataType>) => dispatch(usersActions.setUsersAC(users)),
    }
}

const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users)

export default UsersContainer