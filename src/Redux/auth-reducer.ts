import {AppActionTypes} from "./redux-store";

export type AuthType = typeof initialState

let initialState = {
    id: null,
    email: null,
    login: null,
}

const authReducer = (state: AuthType = initialState, action: AppActionTypes): AuthType => {

    switch (action.type) {
        case "SET_USER_DATA":
            return {
                ...state,
                ...action.data
            }
        default:
            return state;
    }
}

export const authActions = {
    setUserDataAC: (data: AuthType) => ({type: "SET_USER_DATA", data} as const),
}

export default authReducer;