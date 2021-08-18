import {AppActionTypes} from './redux-store'
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

const usersReducer = (state: UsersPageType = initialState, action: AppActionTypes): UsersPageType => {

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

export const usersActions = {
    followSucces: (userId: number) => ({type: "FOLLOW", userId} as const),
    unfollowSucces: (userId: number) => ({type: "UNFOLLOW", userId} as const),
    setUsersAC: (users: Array<UserDataType>) => ({type: "SET_USERS", users} as const),
    setUsersCurrentPageAC: (currentPage: number) => ({type: "SET_USERS_CURRENT_PAGE", currentPage} as const),
    setTotalCountAC: (totalCount: number) => ({type: "SET_TOTAL_COUNT", totalCount} as const),
    toggleIsFetchingAC: (isFetching: boolean) => ({type: "TOGGLE_IS_FETCHING", isFetching} as const),
    toggleIsFollowingProgressAC: (isFollowingProgress: boolean, userId: number) => ({
        type: "TOGGLE_IS_FOLLOWING_PROGRESS", isFollowingProgress, userId
    } as const),
}

export const getUsers = (currentPage: number, pageSize: number) => {
    return (dispatch: Dispatch) => {
        dispatch(usersActions.setUsersCurrentPageAC(currentPage))
        dispatch(usersActions.toggleIsFetchingAC(true))
        userApi.getUsers(currentPage, pageSize)
            .then(data => {
                dispatch(usersActions.toggleIsFetchingAC(false))
                dispatch(usersActions.setUsersAC(data.items))
                dispatch(usersActions.setTotalCountAC(data.totalCount))
        });
    }
}

export const follow = (userId: number) => {
    return (dispatch: Dispatch) => {
        dispatch(usersActions.toggleIsFollowingProgressAC(true, userId))
        userApi.follow(userId)
            .then(data => {
                if (data.resultCode === 0) {
                    dispatch(usersActions.followSucces(userId))
                }
                dispatch(usersActions.toggleIsFollowingProgressAC(false, userId))
            })
    }
}

export const unfollow = (userId: number) => {
    return (dispatch: Dispatch) => {
        dispatch(usersActions.toggleIsFollowingProgressAC(true, userId))
        userApi.unfollow(userId)
            .then(data => {
                if (data.resultCode === 0) {
                    dispatch(usersActions.unfollowSucces(userId))
                }
                dispatch(usersActions.toggleIsFollowingProgressAC(false, userId))
            })
    }
}

export default usersReducer;