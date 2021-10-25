import profileReducer, {addPostAC, deletePostAC, PostDataType, ProfilePageType, ProfileType} from "./profile-reducer";

let initialState: ProfilePageType

beforeEach(() => {
    initialState = {
        postsData: [
            {id: 1, message: "Hey, how are your samurai way?", likesCount: 13},
            {id: 2, message: "Do not lose hope!", likesCount: 0}
        ] as Array<PostDataType>,
        profile: null as ProfileType | null,
        status: ""
    }
})

test("Length of PostData array should be increment", () => {
    let newState = profileReducer(initialState, addPostAC("test data"))

    expect(newState.postsData.length).toBe(3)
})
test("message of new post should be correct", () => {
    let newState = profileReducer(initialState, addPostAC("test data"))

    expect(newState.postsData[2].message).toBe("test data")
})
test("Length of PostData array should be decrement", () => {
    let newState = profileReducer(initialState, deletePostAC(1))

    expect(newState.postsData.length).toBe(1)
})
test("After delete length should not be change if id incorrect", () => {
    let newState = profileReducer(initialState, deletePostAC(1000))

    expect(newState.postsData.length).toBe(2)
})