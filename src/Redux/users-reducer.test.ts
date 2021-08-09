import usersReducer, {usersActions, UsersPageType} from './users-reducer'

test('Change follow to true', () => {

    let initialState: UsersPageType = {
        users: [
            {
                id: 1,
                photos: {
                    small: '',
                    large: ''
                },
                followed: false,
                name: "Alex",
                status: "Typical Alex",
                location: {country: "Russia", city: "Moscow"}
            },
            {
                id: 2,
                photos: {
                    small: '',
                    large: ''
                },
                followed: true,
                name: "Bro",
                status: "A man",
                location: {country: "Ukraine", city: "Donetsk"}
            },
            {
                id: 3,
                photos: {
                    small: '',
                    large: ''
                },
                followed: true,
                name: "Dmitriy",
                status: "Crazy web developer",
                location: {country: "Belarus", city: "Minsk"}
            },
        ],
        currentPage: 1,
        pageSize: 10,
        totalCount: 0,
        isFetching: false,
    }
    const action = usersActions.followAC(1)
    const endState = usersReducer(initialState, action)

    expect(endState).toEqual({
        users: [
            {
                id: 1,
                photos: {
                    small: '',
                    large: ''
                },
                followed: true,
                name: "Alex",
                status: "Typical Alex",
                location: {country: "Russia", city: "Moscow"}
            },
            {
                id: 2,
                photos: {
                    small: '',
                    large: ''
                },
                followed: true,
                name: "Bro",
                status: "A man",
                location: {country: "Ukraine", city: "Donetsk"}
            },
            {
                id: 3,
                photos: {
                    small: '',
                    large: ''
                },
                followed: true,
                name: "Dmitriy",
                status: "Crazy web developer",
                location: {country: "Belarus", city: "Minsk"}
            },
        ],
        currentPage: 1,
        pageSize: 10,
        totalCount: 0,
        isFetching: false,
    });
    expect(endState["users"].every(u => u.followed)).toBeTruthy();
    expect(endState["users"][0].followed).toBe(true);

});