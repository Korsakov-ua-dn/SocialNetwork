import React from 'react'
// import s from './MyPosts.module.css'
import Post from './Post/Post'
import {MyPostsPropsType} from './MyPostsContainer'
import { SubmitHandler, useForm } from 'react-hook-form'

type FormDataType = {
    newPostText: string
}
type PropsType = {
    addPost: (newPostText: string) => void
}
const MyPostForm: React.FC<PropsType> = (props) => {

    const { register, handleSubmit, formState: { errors } } = useForm<FormDataType>();
    const onSubmit: SubmitHandler<FormDataType> = data => props.addPost(data.newPostText)
    

    return <form  onSubmit={handleSubmit(onSubmit)}>
        <div>
            <textarea placeholder='my news...' {...register("newPostText", {
                required: true,
                maxLength : {
                value: 10,
                message: 'max length 10'
                }
            })}/>
            <button>Post</button>
        </div>
        {errors.newPostText?.type === "required" && <span>Field is required</span>}
        {errors.newPostText?.message && <span>{errors.newPostText.message}</span>}
       
    </form>
}

const MyPosts = ({postsData, addPost}: MyPostsPropsType) => {
    
    let postItems = postsData.map(p => <Post key={p.id} id={p.id} message={p.message} likesCount={p.likesCount}/>)

    return (
        <div>
            <h3>My Posts</h3>

            <MyPostForm addPost={addPost}/>

            {postItems}
        </div>
    )
}

export default React.memo(MyPosts);