import { AppThunkTypes } from './store'
import { getAuthUserData } from './auth-reducer'

let initialState = {
    isInit: false
}

const appReducer = (state: AppType = initialState, action: AppActionsType): AppType => {
    switch (action.type) {
        case "app/SUCCESS_INIT":
            return {...state, isInit: true}
        default:
            return state;
    }
}

// actions
export const successInit = () => ({type: "app/SUCCESS_INIT"} as const)

// thunks
export const initializeApp = (): AppThunkTypes => dispatch => {
        let promise = dispatch(getAuthUserData()) // dispatch thunk return promis
        Promise.all([promise])
            .then(() => {
                dispatch(successInit())
            })
}

// types
export type AppType = typeof initialState

type SuccessInit = ReturnType<typeof successInit>

export type AppActionsType = SuccessInit

export default appReducer