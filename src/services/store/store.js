import {authApi} from "../api/authApi.js";
import authSlice from "../slices/authSlice.js";
import {questionsApi} from "../api/questionApi.js";
import {configureStore} from "@reduxjs/toolkit";

// eslint-disable-next-line @typescript-eslint/no-unused-vars



export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        authSlice: authSlice,

    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({}).concat([authApi.middleware])

})

