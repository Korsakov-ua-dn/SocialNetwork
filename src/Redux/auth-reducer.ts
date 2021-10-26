import {AppThunkTypes} from './redux-store'
import {authApi} from '../API/api'

let initialState = {
    id: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    error: '' as string
}

const authReducer = (state: AuthType = initialState, action: AuthActionsType): AuthType => {
    switch (action.type) {
        case "auth/SET_ERROR":
        case "auth/SET_USER_DATA":
            return {
                ...state,
                ...action.payload,
            }
        
        default:
            return state;
    }
}

// actions
export const setUserDataAC = (id: number | null, email: string| null, login: string| null, isAuth: boolean) => 
    ({type: "auth/SET_USER_DATA", payload: {id, email, login, isAuth}} as const)
export const setError = (error: string) => ({type: "auth/SET_ERROR", payload: {error}} as const)

// thunks
export const getAuthUserData = (): AppThunkTypes => async dispatch => {
    const response = await authApi.authMe()
        
    if (response.data.resultCode === 0) {
        let {id, email, login} = response.data.data
        dispatch(setUserDataAC(id, email, login, true))
    }
} // асинхронная функция всегда автоматом возвращает промис!!!
export const login = (email: string, password: string, rememberMe: boolean): AppThunkTypes => async dispatch => {
    try {
        const res = await authApi.login(email, password, rememberMe)
        if(res.data.resultCode === 0) {
            console.log(res)
            dispatch(getAuthUserData())
        } else {
            dispatch(setError(res.data.messages[0]))
        }
        
    } catch (e: any) {      
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
export const _getAuthUserData = (): AppThunkTypes => dispatch => {
    return authApi.authMe()
        .then(responce => {
            if (responce.data.resultCode === 0) {
                let {id, email, login} = responce.data.data
                dispatch(setUserDataAC(id, email, login, true))
            }
        })
} // Санка посттроенная на promise .then

// types
export type AuthType = typeof initialState

export type AuthActionsType = 
      ReturnType<typeof setUserDataAC> 
    | ReturnType<typeof setError>

export default authReducer;