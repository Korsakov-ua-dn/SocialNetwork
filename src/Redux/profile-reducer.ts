import {PostType, ProfilePageType, ActionTypes,} from "./state";

const profileReducer = (state: ProfilePageType, action: ActionTypes) => {

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

export default profileReducer;