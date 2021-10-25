import { Dispatch } from 'redux'
import {userApi, profileApi} from '../API/api'

export type PostDataType = {
    id: number
    message: string
    likesCount: number
}
type ContactType = {
    facebook: string | null
    github: string | null
    instagram: string | null
    mainLink: string | null
    twitter: string | null
    vk: string | null
    website: string | null
    youtube: string | null
}
type PhotosType = {
    small: string
    large: string
}
export type ProfileType = {
    aboutMe: string | null
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string | null
    fullName: string
    contacts: ContactType
    photos: PhotosType
}
export type ProfilePageType = typeof initialState

let initialState = {
    postsData: [
        {id: 1, message: "Hey, how are your samurai way?", likesCount: 13},
        {id: 2, message: "Do not lose hope!", likesCount: 0}
    ] as Array<PostDataType>,
    profile: null as ProfileType | null,
    status: ""
}

export const profileReducer = (state: ProfilePageType = initialState, action: ProfileActionType): ProfilePageType => {

    switch (action.type) {
        case "ADD-POST":
            let newPost: PostDataType = {
                id: new Date().getTime(),
                message: action.newPostText,
                likesCount: 0
            }
            return {
                ...state,
                postsData: [...state.postsData, newPost],
            }
        case "SET_USER_PROFILE":
            return {...state, profile: action.profile}
        case "SET_STATUS":
            return {...state, status: action.status}
        case "DELETE_POST":
            return {
                ...state,
                postsData: state.postsData.filter(el => el.id !== action.postId)
            }
        default:
            return state;
    }
}

// actions
export const addPostAC = (newPostText: string) => ({type: "ADD-POST", newPostText} as const)
export const setUserProfileAC = (profile: ProfileType) => ({type: "SET_USER_PROFILE", profile} as const)
export const setStatusAC = (status: string) => ({type: "SET_STATUS", status} as const)
export const deletePostAC = (postId: number) => ({type: "DELETE_POST", postId} as const)

// thunks
export const getUserProfile = (userId: string) => (dispatch: Dispatch) => {
    userApi.getProfile(userId)
        .then(response => {
            dispatch(setUserProfileAC(response.data))
        });
}
export const getUserStatus = (userId: string) => (dispatch: Dispatch) => {
    profileApi.getStatus(userId)
    .then(res => {
        dispatch(setStatusAC(res.data))
    })
}
export const updateUserStatus = (status: string) => (dispatch: Dispatch) => {
    profileApi.updateStatus(status)
    .then(res => {
        if (res.data.resultCode === 0)
        dispatch(setStatusAC(status))
    })
}

// types
type AddPostActionType = ReturnType<typeof addPostAC>
type SetUserProfileActionType = ReturnType<typeof setUserProfileAC>
type SetStatusActionType = ReturnType<typeof setStatusAC>
type DeletePostActionType = ReturnType<typeof deletePostAC>
export type ProfileActionType = AddPostActionType
    | SetUserProfileActionType
    | SetStatusActionType
    | DeletePostActionType

export default profileReducer;