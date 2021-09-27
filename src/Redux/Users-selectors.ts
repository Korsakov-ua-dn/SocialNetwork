import {UsersPageType} from "./users-reducer";

export const getUsers = (state: UsersPageType) => state.users
export const getTotalCount = (state: UsersPageType) => state.totalCount
export const getPageSize = (state: UsersPageType) => state.pageSize
export const getCurrentPage = (state: UsersPageType) => state.currentPage
export const getIsFollowingProgress = (state: UsersPageType) => state.isFollowingProgress
export const getIsFetching = (state: UsersPageType) => state.isFetching
