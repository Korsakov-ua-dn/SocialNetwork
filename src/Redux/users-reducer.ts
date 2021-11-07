import {CommonType, userApi, UserDataType} from '../API/api'
import {Dispatch} from 'redux'

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
        case "users/FOLLOW":
            return {
                ...state,
                users: state.users.map(u => u.id !== action.userId ? u : {...u, followed: true})
            }
        case "users/UNFOLLOW":
            return {
                ...state,
                users: state.users.map(u => u.id !== action.userId ? u : {...u, followed: false})
            }
        case "users/SET_USERS":
            return {...state, users: action.users}
        case "users/SET_USERS_CURRENT_PAGE":
            return {...state, currentPage: action.currentPage}
        case "users/SET_TOTAL_COUNT":
            return {...state, totalCount: action.totalCount}
        case "users/TOGGLE_IS_FETCHING":
            return {...state, isFetching: action.isFetching}
        case "users/TOGGLE_IS_FOLLOWING_PROGRESS":
            return {
                ...state, isFollowingProgress:
                    action.isFollowingProgress
                        ? [...state.isFollowingProgress, action.userId]
                        : state.isFollowingProgress.filter(id => id !== action.userId)
            }
        default:
            return state;
    }
}

// actions 
export const followSuccess = (userId: number) => ({type: "users/FOLLOW", userId} as const)
export const unfollowSuccess = (userId: number) => ({type: "users/UNFOLLOW", userId} as const)
export const setUsersAC = (users: Array<UserDataType>) => ({type: "users/SET_USERS", users} as const)
export const setUsersCurrentPageAC = (currentPage: number) =>
    ({type: "users/SET_USERS_CURRENT_PAGE", currentPage} as const)
export const setTotalCountAC = (totalCount: number) => ({type: "users/SET_TOTAL_COUNT", totalCount} as const)
export const toggleIsFetchingAC = (isFetching: boolean) => ({type: "users/TOGGLE_IS_FETCHING", isFetching} as const)
export const toggleIsFollowingProgressAC = (isFollowingProgress: boolean, userId: number) =>
    ({type: "users/TOGGLE_IS_FOLLOWING_PROGRESS", isFollowingProgress, userId} as const)

// thunks    
export const requestUsers = (currentPage: number, pageSize: number) => async (dispatch: Dispatch) => {
    dispatch(setUsersCurrentPageAC(currentPage))
    dispatch(toggleIsFetchingAC(true))
    try {
        const data = await userApi.getUsers(currentPage, pageSize)
        if (!data.error) {
            dispatch(setUsersAC(data.items))
            dispatch(setTotalCountAC(data.totalCount))
        }
    } catch (e: any) {
        console.log("Something went wrong")
    } finally {
        dispatch(toggleIsFetchingAC(false))
    }
}
export const followUnfollowFlow =
    async (dispatch: Dispatch, userId: number, apiMethod: (id: number) => Promise<CommonType>, actionCreator: any) => {

        dispatch(toggleIsFollowingProgressAC(true, userId))
        const data = await apiMethod(userId)
        if (data.resultCode === 0) {
            dispatch(actionCreator(userId))
        }
        dispatch(toggleIsFollowingProgressAC(false, userId))
    }
export const follow = (userId: number) => async (dispatch: Dispatch) => {
    await followUnfollowFlow(dispatch, userId, userApi.follow.bind(userApi), followSuccess)
}

export const unfollow = (userId: number) => {
    return async (dispatch: Dispatch) => {
        await followUnfollowFlow(dispatch, userId, userApi.unfollow.bind(userApi), unfollowSuccess)
    }
}
export const _unfollow = (userId: number) => {
    return (dispatch: Dispatch) => {
        dispatch(toggleIsFollowingProgressAC(true, userId))
        userApi.unfollow(userId)
            .then(data => {
                if (data.resultCode === 0) {
                    dispatch(unfollowSuccess(userId))
                }
                dispatch(toggleIsFollowingProgressAC(false, userId))
            })
    }
} // осталось на память после рефакторинга дублирования кода

//types
export type UsersPageType = typeof initialState

export type UsersActionType = ReturnType<typeof followSuccess>
    | ReturnType<typeof unfollowSuccess>
    | ReturnType<typeof setUsersAC>
    | ReturnType<typeof setUsersCurrentPageAC>
    | ReturnType<typeof setTotalCountAC>
    | ReturnType<typeof toggleIsFetchingAC>
    | ReturnType<typeof toggleIsFollowingProgressAC>

export default usersReducer;