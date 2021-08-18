import { Dispatch } from 'redux'
import {AppActionTypes} from './redux-store'
import {userApi} from '../API/api'

export type PostDataType = {
    id: number
    message: string
    likesCount: number
}
type ContactType = {
    facebook: string
    github: string
    instagram: string
    mainLink: string | null
    twitter: string
    vk: string
    website: string
    youtube: string | null
}
type PhotosType = {
    small: string
    large: string
}
export type ProfileType = {
    aboutMe: string
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
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
    newPostText: 'it-kamasutra.com',
    profile: null as ProfileType | null,
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
            return {
                ...state,
                newPostText: action.newText
            }

        case "CHANGE-TEXT":
            return {
                ...state,
                newPostText: action.newText
            }
        case "SET_USER_PROFILE":
            return {...state, profile: action.profile}

        default:
            return state;

    }
}

export const profileActions = {
    addPostAC: () => ({type: "ADD-POST"} as const),
    updateNewPostTextAC: (text: string) => ({type: "UPDATE-NEW-POST-TEXT", newText: text} as const),
    changeTextAC: (newText: string) => ({type: "CHANGE-TEXT", newText: newText} as const),
    setUserProfileAC: (profile: ProfileType) => ({type: "SET_USER_PROFILE", profile} as const),
}

export const getUserProfile = (userId: string) => (dispatch: Dispatch) => {
    userApi.getProfile(userId)
        .then(response => {
            dispatch(profileActions.setUserProfileAC(response.data))
        });
}


export default profileReducer;