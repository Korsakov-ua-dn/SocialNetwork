import React from 'react'
// import s from './MyPosts.module.css'
import Post from './Post/Post'
import {MyPostsPropsType} from './MyPostsContainer'
import { Field, InjectedFormProps, reduxForm } from 'redux-form'

type FormDataType = {
    newPostText: string
}
const ProfileForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <Field component="input" name="newPostText" placeholder='your news...'/>
        <button>Send</button>
    </form>
}

const ProfilePostReduxForm = reduxForm<FormDataType>({form: "ProfilePost"})(ProfileForm)

const MyPosts = ({postsData, addPost}: MyPostsPropsType) => {

    let postItems = postsData.map(p => <Post key={p.id} id={p.id} message={p.message} likesCount={p.likesCount}/>)

    const submit = (ProfileForm: FormDataType) => {
        addPost(ProfileForm.newPostText)
    }

    return (
        <div>
            <h3>My Posts</h3>
            <ProfilePostReduxForm onSubmit={submit}/>
            {postItems}
        </div>
    )
}

export default MyPosts;