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


export const userApi = {
    getUsers(currentPage: number, pageSize: number) {
        return instance.get<GetUsersType>(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
    },
    unfollow(id: number) {
        return instance.delete<CommonType>(`follow/${id}`)
            .then(response => response.data)
    },
    follow(id: number) {
        return instance.post<CommonType>(`follow/${id}`)
            .then(response => response.data)
    },
    getProfile(userId: string) {
        console.warn("Please use profileApi to make this request");
        return profileApi.getProfile(userId)
    },
}

export const profileApi = {
    getProfile(userId: string) {
        return instance.get<ProfileType>(`profile/${userId}`)
    },
    getStatus(userId: string) {
        return instance.get(`/profile/status/${userId}`)
    },
    updateStatus(status: string) {
        return instance.put(`/profile/status`, {"status": status})
    },
}

export const authApi = {
    authMe() {
        return instance.get<CommonType<{ id: number, login: string, email: string }>>(`auth/me`)
    },
    login(email: string, password: string, rememberMe: boolean) {
        return instance.post<CommonType<{userId: number}>>(`/auth/login`, {"email": email, "password": password, "rememberMe": rememberMe})
    },
    logout() {
        return instance.delete<CommonType>(`/auth/login`)
    },
}


// types
type GetUsersType = {
    error: null | string
    items: UserDataType[]
    totalCount: number
}

export type CommonType<T = {}> = {
    data: T
    messages: Array<string>
    fieldsErrors: []
    resultCode: number
}