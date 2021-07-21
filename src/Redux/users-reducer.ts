import {AppActionTypes} from "./redux-store";

type LocationType = {
    country: string
    city: string
}
export type UserDataType = {
    userId: number
    avatar: string
    follow: boolean
    fullName: string
    status: string
    location: LocationType
}
export type UsersPageType = typeof initialState

let initialState = {
    users: [] as Array<UserDataType>,
}

const usersReducer = (state: UsersPageType = initialState, action: AppActionTypes): UsersPageType => {

    switch(action.type) {
        case "FOLLOW": 
            return {
            ...state,
            users: state.users.map(u => u.userId !== action.userId ? u : {...u, follow: true})
        }
        case "UNFOLLOW": 
            return {
            ...state,
            users: state.users.map(u => u.userId !== action.userId ? u : {...u, follow: false})
        }
        case "SET_USERS":
            return {...state, users: [...state.users, ...action.users] }

        default:
            return state;

    }
}

export const usersActions = {
    followAC: (userId: number) => ({type: "FOLLOW", userId} as const),
    unfollowAC:  (userId: number) => ({type: "UNFOLLOW", userId} as const),
    setUsersAC: (users: Array<UserDataType>) => ({type: "SET_USERS", users} as const),
}

export default usersReducer;