import {AppActionTypes, AppThunkTypes} from "./redux-store";
import {authApi} from '../API/api'

export type AuthType = typeof initialState

let initialState = {
    id: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false
}

const authReducer = (state: AuthType = initialState, action: AppActionTypes): AuthType => {

    switch (action.type) {
        case "SET_USER_DATA":
            return {
                ...state,
                ...action.preloader,
            }
        default:
            return state;
    }
}

export const setUserDataAC = (id: number | null, email: string| null, login: string| null, isAuth: boolean) => ({
    type: "SET_USER_DATA",
    preloader: {id, email, login, isAuth}
} as const)

export const getAuthUserData = (): AppThunkTypes => dispatch => {
    authApi.authMe()
        .then(responce => {
            if (responce.data.resultCode === 0) {
                let {id, email, login} = responce.data.data
                dispatch(setUserDataAC(id, email, login, true))
            }
        })
}

export const login = (email: string, password: string, rememberMe: boolean): AppThunkTypes => async dispatch => {
    try {
        const res = await authApi.login(email, password, rememberMe)
        console.log(res)
        dispatch(getAuthUserData())
    } catch (e) {
        throw new Error(e)
    }
}
export const logout = (): AppThunkTypes => async dispatch => {
    const res = await authApi.logout()
    if (res.data.resultCode === 0) {
        dispatch(setUserDataAC(null, null, null, false))
    }
}

export const _login = (email: string, password: string, rememberMe: boolean): AppThunkTypes => dispatch => {
    authApi.login(email, password, rememberMe)
        .then(res => {
            if (res.data.resultCode === 0) {
                console.log(res)
                dispatch(getAuthUserData())
            }
        })
} // Санка посттроенная на promise .then

export const _logout = (): AppThunkTypes => dispatch => {
    authApi.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setUserDataAC(null, null, null, false))
            }
        })
} // Санка посттроенная на promise .then

export default authReducer;