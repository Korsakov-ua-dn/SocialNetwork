import {usersActions, UsersPageType} from './users-reducer'

test('Change follow to true', () => {

    let initialState: UsersPageType = {
        users: [
          {userId: 1, follow: false, fullName: "Alex", status: "Typical Alex", location: {country: "Russia", city: "Moscow"}},
          {userId: 2, follow: true, fullName: "Bro", status: "A man", location: {country: "Ukraine", city: "Donetsk"}},
          {userId: 3, follow: true, fullName: "Dmitry", status: "Crazy web developer", location: {country: "Belarus", city: "Minsk"}},
        ],
    }

    const endState = usersActions.followAC(1)

    expect(endState).toEqual({
        users: [
            {userId: 1, follow: true, fullName: "Alex", status: "Typical Alex", location: {country: "Russia", city: "Moscow"}},
            {userId: 2, follow: true, fullName: "Bro", status: "A man", location: {country: "Ukraine", city: "Donetsk"}},
            {userId: 3, follow: true, fullName: "Dmitry", status: "Crazy web developer", location: {country: "Belarus", city: "Minsk"}},
          ]
    });

    // expect(endState[users].every(u => u.follow )).toBeTruthy();
    // expect(endState[users][0].follow).toBe(true);

});