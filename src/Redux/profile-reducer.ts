import { Dispatch } from 'redux'
import {AppActionTypes} from './redux-store'
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
type ProfilePageType = typeof initialState

let initialState = {
    postsData: [
        {id: 1, message: "Hey, how are your samurai way?", likesCount: 13},
        {id: 2, message: "Do not lose hope!", likesCount: 0}
    ] as Array<PostDataType>,
    newPostText: "it-kamasutra.com",
    profile: null as ProfileType | null,
    status: ""
}

const profileReducer = (state: ProfilePageType = initialState, action: AppActionTypes): ProfilePageType => {

    switch (action.type) {

        case "ADD-POST":
            let newPost: PostDataType = {
                id: new Date().getTime(),
                message: state.newPostText,
                likesCount: 0
            }
            return {
                ...state,
                postsData: [...state.postsData, newPost],
                newPostText: ''
            }
        case "UPDATE-NEW-POST-TEXT":
            return {...state, newPostText: action.newText}
        case "CHANGE-TEXT":
            return { ...state, newPostText: action.newText}
        case "SET_USER_PROFILE":
            return {...state, profile: action.profile}
        case "SET_STATUS":
            return {...state, status: action.status}
        default:
            return state;

    }
}

export const profileActions = {
    addPostAC: () => ({type: "ADD-POST"} as const),
    updateNewPostTextAC: (text: string) => ({type: "UPDATE-NEW-POST-TEXT", newText: text} as const),
    changeTextAC: (newText: string) => ({type: "CHANGE-TEXT", newText} as const),
    setUserProfileAC: (profile: ProfileType) => ({type: "SET_USER_PROFILE", profile} as const),
    setStatusAC: (status: string) => ({type: "SET_STATUS", status} as const),
}

export const getUserProfile = (userId: string) => (dispatch: Dispatch) => {
    userApi.getProfile(userId)
        .then(response => {
            dispatch(profileActions.setUserProfileAC(response.data))
        });
}

export const getUserStatus = (userId: string) => (dispatch: Dispatch) => {
    profileApi.getStatus(userId)
    .then(res => {
        dispatch(profileActions.setStatusAC(res.data))
    })
}

export const updateUserStatus = (status: string) => (dispatch: Dispatch) => {
    profileApi.updateStatus(status)
    .then(res => {
        if (res.data.resultCode === 0)
        dispatch(profileActions.setStatusAC(status))
    })
}


export default profileReducer;