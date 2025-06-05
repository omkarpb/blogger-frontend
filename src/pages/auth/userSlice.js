import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'user',
    initialState: {
        id: '',
        email: '',
        firstName: '',
        lastName: '',
        authToken: '',
    },
    reducers: {
        userAdded(state, action) {
            state.id = action.payload.username;
            state.email = action.payload.email;
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
            state.authToken = action.payload.authToken;
        },
    },
});

export const { userAdded } = userSlice.actions;
export default userSlice.reducer;
