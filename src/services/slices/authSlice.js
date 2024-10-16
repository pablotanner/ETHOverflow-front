import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userInfo: {}, // for user object
    accessToken: null,
    error: null,
    success: false, // for monitoring the registration process.
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.userInfo = action.payload
        },
        logout: () => initialState,
    },
})



export const { logout, setUser } = authSlice.actions
export default authSlice.reducer

export const selectCurrentUser = (state) => state.auth.user