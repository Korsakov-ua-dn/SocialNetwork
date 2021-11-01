import {Dispatch} from 'redux'
import {userApi, profileApi} from '../API/api'
import {AppStateType, AppThunkTypes} from "./redux-store";
import {DescriptionDataType} from "../Components/MainContent/Profile/ProfileInfo/ProfileInfo";

export type PostDataType = {
    id: number
    message: string
    likesCount: number
}
export type ContactType = {
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
    ],
    profile: null as ProfileType | null,
    status: "",
    profileError: " ",
}

export const profileReducer = (state: ProfilePageType = initialState, action: ProfileActionType): ProfilePageType => {

    switch (action.type) {
        case "profile/ADD-POST":
            let newPost: PostDataType = {
                id: new Date().getTime(),
                message: action.newPostText,
                likesCount: 0
            }
            return {
                ...state,
                postsData: [...state.postsData, newPost],
            }
        case "profile/SET_USER_PROFILE":
            return {...state, profile: action.profile}
        case "profile/SET_STATUS":
            return {...state, status: action.status}
        case "profile/DELETE_POST":
            return {
                ...state,
                postsData: state.postsData.filter(el => el.id !== action.postId)
            }
        case "profile/SET_AVATAR":
            return state.profile ? {...state, profile: {...state.profile, photos: action.photo}} : state
        // проверка на null, иначе ошибка деструктуризации ...state.profile
        case "profile/SET_ERROR":
            return {...state, profileError: action.error}
        default:
            return state;
    }
}

// actions
export const addPostAC = (newPostText: string) => ({type: "profile/ADD-POST", newPostText} as const)
export const setUserProfileAC = (profile: ProfileType) => ({type: "profile/SET_USER_PROFILE", profile} as const)
export const setStatusAC = (status: string) => ({type: "profile/SET_STATUS", status} as const)
export const deletePostAC = (postId: number) => ({type: "profile/DELETE_POST", postId} as const)
export const setAvatarAC = (photo: PhotosType) => ({type: "profile/SET_AVATAR", photo} as const)
export const setErrorAC = (error: string) => ({type: "profile/SET_ERROR", error} as const)

// thunks
export const getUserProfile = (userId: string) => async (dispatch: Dispatch) => {
    const response = await userApi.getProfile(userId)
    dispatch(setUserProfileAC(response.data))
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
export const updateAvatar = (photo: any) => (dispatch: Dispatch) => {
    profileApi.updatePhotos(photo)
        .then(res => {
            if (res.data.resultCode === 0)
                dispatch(setAvatarAC(res.data.data.photos))
        })
}
export const updateDescription = (data: DescriptionDataType): AppThunkTypes => (dispatch, getState: () => AppStateType) => {
    profileApi.updateDescription(data)
        .then(res => {
            if (res.data.resultCode === 0) {
                const userId = getState().auth.id?.toString()
                if (userId) dispatch(getUserProfile(userId))
            } else {
                dispatch(setErrorAC(res.data.messages))
            }
        })
}

// types
export type ProfileActionType = ReturnType<typeof addPostAC>
    | ReturnType<typeof setUserProfileAC>
    | ReturnType<typeof setStatusAC>
    | ReturnType<typeof deletePostAC>
    | ReturnType<typeof deletePostAC>
    | ReturnType<typeof setAvatarAC>
    | ReturnType<typeof setErrorAC>

export default profileReducer;