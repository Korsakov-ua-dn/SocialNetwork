import MyPosts from './MyPosts'
import {AppStateType} from '../../../../Redux/redux-store'
import {addPostAC, PostDataType} from '../../../../Redux/profile-reducer'
import {connect} from 'react-redux'
import {Dispatch} from 'redux'


export type MyPostsPropsType = mapStateToPropsType & mapDispatchToPropsType

const mapStateToProps = (state: AppStateType): mapStateToPropsType => 
    ({
        postsData: state.profilePage.postsData,
        photoSmall: state.profilePage.profile?.photos.small
    })

const mapDispatchToProps = (dispatch: Dispatch): mapDispatchToPropsType => 
    ({addPost: (newPostText: string) => dispatch(addPostAC(newPostText))})

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer

//types

type mapStateToPropsType = {
    postsData: PostDataType[]
    photoSmall: string | undefined
}
type mapDispatchToPropsType = {addPost: (newPostText: string) => void}