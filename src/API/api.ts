import axios from 'axios'
import {UserDataType} from '../Redux/users-reducer'
import {ProfileType} from '../Redux/profile-reducer'

const instance = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    headers: {
        'API-KEY': '7310af47-87fb-4f01-ab93-b6fcc5cb60c0'
    },
})

type GetUsersType = {
    error: null | string
    items: UserDataType[]
    totalCount: number
}
type UnfollowFollowType = {
    data: {}
    fieldsErrors: []
    messages: []
    resultCode: number
}
type AuthMeType = {
    data: {id: number, login: string, email: string}
    fieldsErrors: []
    messages: []
    resultCode: number
}

export const userApi = {
    getUsers(currentPage: number, pageSize: number) {
        return instance.get<GetUsersType>(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
    },
    unfollow(id: number) {
        return instance.delete<UnfollowFollowType>(`follow/${id}`)
            .then(response => response.data)
    },
    follow(id: number) {
        return instance.post<UnfollowFollowType>(`follow/${id}`)
            .then(response => response.data)
    },
    getProfile(userId: string) {
        return instance.get<ProfileType>(`profile/${userId}`)
    },
}

export const authApi = {
    authMe() {
        return instance.get<AuthMeType>(`auth/me`)
    },
}