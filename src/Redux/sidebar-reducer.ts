import {SidebarType, AppActionTypes} from "./redux-store";

let initialState = {}

const sidebarReducer = (state: SidebarType = initialState, action: AppActionTypes): SidebarType => {

    return state;
}

export default sidebarReducer;