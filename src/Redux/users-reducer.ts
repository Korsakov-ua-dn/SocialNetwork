import {userApi} from '../API/api'
import { Dispatch } from 'redux'

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
    followed: boolean
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
    isFetching: false,
    isFollowingProgress: [] as number[],
}

const usersReducer = (state: UsersPageType = initialState, action: UsersActionType): UsersPageType => {

    switch (action.type) {
        case "FOLLOW":
            return {
                ...state,
                users: state.users.map(u => u.id !== action.userId ? u : {...u, followed: true})
            }
        case "UNFOLLOW":
            return {
                ...state,
                users: state.users.map(u => u.id !== action.userId ? u : {...u, followed: false})
            }
        case "SET_USERS":
            return {...state, users: action.users}
        case "SET_USERS_CURRENT_PAGE":
            return {...state, currentPage: action.currentPage}
        case "SET_TOTAL_COUNT":
            return {...state, totalCount: action.totalCount}
        case "TOGGLE_IS_FETCHING":
            return {...state, isFetching: action.isFetching}
        case "TOGGLE_IS_FOLLOWING_PROGRESS":
            return {...state, isFollowingProgress:
                action.isFollowingProgress
                    ? [...state.isFollowingProgress, action.userId]
                    : state.isFollowingProgress.filter(id => id !== action.userId)
                }
        default:
            return state;
    }
}

// actions 
export const followSucces = (userId: number) => ({type: "FOLLOW", userId} as const)
export const unfollowSucces = (userId: number) => ({type: "UNFOLLOW", userId} as const)
export const setUsersAC = (users: Array<UserDataType>) => ({type: "SET_USERS", users} as const)
export const setUsersCurrentPageAC = (currentPage: number) => ({type: "SET_USERS_CURRENT_PAGE", currentPage} as const)
export const setTotalCountAC = (totalCount: number) => ({type: "SET_TOTAL_COUNT", totalCount} as const)
export const toggleIsFetchingAC = (isFetching: boolean) => ({type: "TOGGLE_IS_FETCHING", isFetching} as const)
export const toggleIsFollowingProgressAC = (isFollowingProgress: boolean, userId: number) =>
    ({type: "TOGGLE_IS_FOLLOWING_PROGRESS", isFollowingProgress, userId} as const)


// thunks    
export const getUsers = (currentPage: number, pageSize: number) => (dispatch: Dispatch) => {
    dispatch(setUsersCurrentPageAC(currentPage))
    dispatch(toggleIsFetchingAC(true))
    userApi.getUsers(currentPage, pageSize)
        .then(data => {
            dispatch(toggleIsFetchingAC(false))
            dispatch(setUsersAC(data.items))
            dispatch(setTotalCountAC(data.totalCount))
    });
}
export const follow = (userId: number) => {
    return (dispatch: Dispatch) => {
        dispatch(toggleIsFollowingProgressAC(true, userId))
        userApi.follow(userId)
            .then(data => {
                if (data.resultCode === 0) {
                    dispatch(followSucces(userId))
                }
                dispatch(toggleIsFollowingProgressAC(false, userId))
            })
    }
}
export const unfollow = (userId: number) => {
    return (dispatch: Dispatch) => {
        dispatch(toggleIsFollowingProgressAC(true, userId))
        userApi.unfollow(userId)
            .then(data => {
                if (data.resultCode === 0) {
                    dispatch(unfollowSucces(userId))
                }
                dispatch(toggleIsFollowingProgressAC(false, userId))
            })
    }
}

type followSucces = ReturnType<typeof followSucces>
type unfollowSucces = ReturnType<typeof unfollowSucces>
type setUsersAC = ReturnType<typeof setUsersAC>
type follsetUsersCurrentPageACowSucces = ReturnType<typeof setUsersCurrentPageAC>
type setTotalCountAC = ReturnType<typeof setTotalCountAC>
type toggleIsFetchingAC = ReturnType<typeof toggleIsFetchingAC>
type toggleIsFollowingProgressAC = ReturnType<typeof toggleIsFollowingProgressAC>
export type UsersActionType = followSucces
    | unfollowSucces
    | setUsersAC
    | follsetUsersCurrentPageACowSucces
    | setTotalCountAC
    | toggleIsFetchingAC
    | toggleIsFollowingProgressAC


export default usersReducer;