import {ProfileType} from "../Components/MainContent/Profile/ProfileContainer";
import {AppActionTypes} from "./redux-store";

export type PostDataType = {
    id: number
    message: string
    likesCount: number
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
    setUserProfileAC: (profile: any) => ({type: "SET_USER_PROFILE", profile} as const),
}

// export const addPostAC = () => ({type: "ADD-POST"}) as const
// export const updateNewPostTextAC= (text: string) => ({type: "UPDATE-NEW-POST-TEXT", newText: text}) as const
// export const changeTextAC = (newText: string) => ({type: "CHANGE-TEXT", newText: newText}) as const
// export const changeMessageBodyAC = (body: string) => ({type: "CHANGE-MESSAGE-BODY", body: body}) as const
// export const sendMessageAC = () => ({type: "SEND-MESSAGE"}) as const

export default profileReducer;