import MyPosts from './MyPosts'

import {AppStoreType} from '../../../../Redux/redux-store'
import {profileActions} from '../../../../Redux/profile-reducer'

type MyPostContainerPropsType = {
    store: AppStoreType
}

const MyPostsContainer = ({store}: MyPostContainerPropsType) => {
    const state = store.getState()

    const addPost = () => {
        store.dispatch(profileActions.addPostAC())
    }

     const onPostChange = (text: string) => {
        if (text) {
            store.dispatch(profileActions.updateNewPostTextAC(text))
        }
    }

    return (
        <MyPosts postsData={state.profilePage.postsData}
                 newPostText={state.profilePage.newPostText}
                 onPostChange={onPostChange}
                 addPost={addPost}/>
    )
}

export default MyPostsContainer;