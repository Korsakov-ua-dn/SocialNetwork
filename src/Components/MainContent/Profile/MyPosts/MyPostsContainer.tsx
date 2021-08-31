import MyPosts from './MyPosts'
import {AppStateType} from '../../../../Redux/redux-store'
import {profileActions, PostDataType} from '../../../../Redux/profile-reducer'
import {connect} from 'react-redux'
import {Dispatch} from 'redux'

// type MyPostContainerPropsType = {
//     store: AppStoreType
// }
// type StoreContextType = {
//     store: AppStoreType
//     children: React.ReactNode
// }

// const MyPostsContainer = () => {

//     return (
//         <StoreContext.Consumer> 
//             { (store) => {
//             const state = store.getState()
//             const addPost = () => {
//                 store.dispatch(profileActions.addPostAC())
//             }
//              const onPostChange = (text: string) => {
//                 if (text) {
//                     store.dispatch(profileActions.updateNewPostTextAC(text))
//                 }
//             }
//             return (
//                 <MyPosts postsData={state.profilePage.postsData}
//                 newPostText={state.profilePage.newPostText}
//                 onPostChange={onPostChange}
//                 addPost={addPost}/> 
//             )
//             }
//         }
//         </StoreContext.Consumer>
//     )
// }

type mapStateToPropsType = {
    postsData: PostDataType[]
}
type mapDispatchToPropsType = {
    addPost: (newPostText: string) => void
}
export type MyPostsPropsType = mapStateToPropsType & mapDispatchToPropsType

let mapStateToProps = (state: AppStateType): mapStateToPropsType => {
    return (
        {
            postsData: state.profilePage.postsData,
        }
    )
}
let mapDispatchToProps = (dispatch: Dispatch): mapDispatchToPropsType => {
    return (
        {
            addPost: (newPostText: string) => dispatch(profileActions.addPostAC(newPostText)),
        }
    )
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer;