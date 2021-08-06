import {AppActionTypes} from "./redux-store";

export type AuthType = typeof initialState

let initialState = {
    id: null as number| null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false
}

const authReducer = (state: AuthType = initialState, action: AppActionTypes): AuthType => {

    switch (action.type) {
        case "SET_USER_DATA":
            return {
                ...state,
                ...action.data,
                isAuth: true
            }
        default:
            return state;
    }
}

export const authActions = {
    setUserDataAC: (id: number, email: string, login: string) => ({type: "SET_USER_DATA", data: {id, email, login}} as const),
}

export default authReducer;