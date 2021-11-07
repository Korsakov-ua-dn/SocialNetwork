import {RootAppActionsType} from "./store";

type SidebarPageType = typeof initialState

let initialState = {}

const sidebarReducer = (state: SidebarPageType = initialState, action: RootAppActionsType): SidebarPageType => {

    return state;
}

export default sidebarReducer;