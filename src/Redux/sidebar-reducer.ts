import {AppActionTypes} from "./redux-store";

type SidebarPageType = typeof initialState

let initialState = {}

const sidebarReducer = (state: SidebarPageType = initialState, action: AppActionTypes): SidebarPageType => {

    return state;
}

export default sidebarReducer;