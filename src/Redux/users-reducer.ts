import {AppActionTypes} from "./redux-store";

type LocationType = {
    country: string
    city: string
}
type PhotosType = {
    small: string
    large: string
}
export type UserDataType = {
    id: number
    photos: PhotosType
    follow: boolean
    name: string
    status: string
    location: LocationType
}
export type UsersPageType = typeof initialState

let initialState = {
    users: [] as Array<UserDataType>,
    currentPage: 1,
    pageSize: 10,
    totalCount: 0,
}

const usersReducer = (state: UsersPageType = initialState, action: AppActionTypes): UsersPageType => {

    switch (action.type) {
        case "FOLLOW":
            return {
                ...state,
                users: state.users.map(u => u.id !== action.userId ? u : {...u, follow: true})
            }
        case "UNFOLLOW":
            return {
                ...state,
                users: state.users.map(u => u.id !== action.userId ? u : {...u, follow: false})
            }
        case "SET_USERS":
            return {...state, users: action.users}
        case "SET_USERS_CURRENT_PAGE":
            return {...state, currentPage: action.currentPage}
        case "SET_TOTAL_COUNT":
            return {...state, totalCount: action.totalCount}
        default:
            return state;
    }
}

export const usersActions = {
    followAC: (userId: number) => ({type: "FOLLOW", userId} as const),
    unfollowAC: (userId: number) => ({type: "UNFOLLOW", userId} as const),
    setUsersAC: (users: Array<UserDataType>) => ({type: "SET_USERS", users} as const),
    setUsersCurrentPageAC: (currentPage: number) => ({type: "SET_USERS_CURRENT_PAGE", currentPage} as const),
    setTotalCountAC: (totalCount: number) => ({type: "SET_TOTAL_COUNT", totalCount} as const),
}

export default usersReducer;