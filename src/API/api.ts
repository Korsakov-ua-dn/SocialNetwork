import axios from 'axios'
import {DescriptionDataType} from "../Components/MainContent/Profile/ProfileInfo/UpdateDescriptionForm/UpdateDescriptionForm";

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
    updatePhotos(photos: any) {
        const formData = new FormData()
        formData.append("image", photos)
        return instance.put(`/profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    updateDescription(data: DescriptionDataType) {
        return instance.put(`/profile`, {...data})
    },
}   

export const authApi = {
    authMe() {
        return instance.get<CommonType<{ id: number, login: string, email: string }>>(`auth/me`)
    },
    login(email: string, password: string, rememberMe: boolean, captcha: string | null = null) {
        return instance.post<CommonType<{userId: number}>>(`/auth/login`, {"email": email, "password": password, "rememberMe": rememberMe, "captcha": captcha})
    },
    logout() {
        return instance.delete<CommonType>(`/auth/login`)
    },
}

export const securityApi = {
    getCaptchaUrl() {
        return instance.get<{url: string}>(`/security/get-captcha-url`)
    },
}

// types
export type CommonType<T = {}> = {
    data: T
    messages: Array<string>
    fieldsErrors: []
    resultCode: number
}
export type PhotosType = {
    small: string
    large: string
}
export type UserDataType = {
    id: number
    photos: PhotosType
    followed: boolean
    name: string
    status: string
    uniqueUrlName: null
}
type GetUsersType = {
    error: null | string
    items: UserDataType[]
    totalCount: number
}
export type ContactType = {
    facebook: string | null
    github: string | null
    instagram: string | null
    mainLink: string | null
    twitter: string | null
    vk: string | null
    website: string | null
    youtube: string | null
}
export type ProfileType = {
    aboutMe: string | null
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string | null
    fullName: string
    contacts: ContactType
    photos: PhotosType
}