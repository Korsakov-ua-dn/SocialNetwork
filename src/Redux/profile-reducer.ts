import {PostType, ProfilePageType, AppActionTypes} from "./redux-store";

let initialState = {
    postsData: [
      {id: 1, message: "Hey, how are your samurai way?", likesCount: 13},
      {id: 2, message: "Do not lose hope!", likesCount: 0}
    ],
  newPostText: 'it-kamasutra.com'
  }

const profileReducer = (state: ProfilePageType = initialState, action: AppActionTypes): ProfilePageType => {

    switch(action.type) {

        case "ADD-POST":
            let newPost: PostType = {
                id: new Date().getTime(),
                message: state.newPostText,
                likesCount: 0
            }
            state.postsData.push(newPost)
            state.newPostText = ""
            return state;

        case "UPDATE-NEW-POST-TEXT":
            state.newPostText = action.newText
            return state;

        case "CHANGE-TEXT":
            state.newPostText = action.newText
            return state;

        default:
            return state;

    }
}

export const profileActions = {
    addPostAC: () => ({type: "ADD-POST"} as const),
    updateNewPostTextAC: (text: string) => ({type: "UPDATE-NEW-POST-TEXT", newText: text} as const),
    changeTextAC:  (newText: string) => ({type: "CHANGE-TEXT", newText: newText} as const),
}

// export const addPostAC = () => ({type: "ADD-POST"}) as const
// export const updateNewPostTextAC= (text: string) => ({type: "UPDATE-NEW-POST-TEXT", newText: text}) as const
// export const changeTextAC = (newText: string) => ({type: "CHANGE-TEXT", newText: newText}) as const
// export const changeMessageBodyAC = (body: string) => ({type: "CHANGE-MESSAGE-BODY", body: body}) as const
// export const sendMessageAC = () => ({type: "SEND-MESSAGE"}) as const

export default profileReducer;