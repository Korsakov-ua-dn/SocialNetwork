import {UserDataType} from '../../../Redux/users-reducer'
import {Paginator} from '../../common/Paginator/Paginator'
import User from './User'
import React from "react"

type UsersPropsType = {
    users: Array<UserDataType>
    totalCount: number
    pageSize: number
    currentPage: number
    isFollowingProgress: number[]
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    onPageChanged: (currentPage: number) => void
}

const Users: React.FC<UsersPropsType> = (
    {
        users,
        totalCount,
        pageSize,
        currentPage,
        isFollowingProgress,
        follow,
        unfollow,
        onPageChanged,
        ...props
    }
) => {

    return (
        <div>
            <Paginator
                totalCount={totalCount}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChanged={onPageChanged}
                portionSize={20}/>
            {
                users.map(u => <User key={u.id}
                                     user={u}
                                     isFollowingProgress={isFollowingProgress}
                                     follow={follow}
                                     unfollow={unfollow}/>)
            }
        </div>
    )
}

export default Users