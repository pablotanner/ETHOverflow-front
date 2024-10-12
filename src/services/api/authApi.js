import {createApi} from "@reduxjs/toolkit/query/react";
import customFetchBase from "./customFetchBase.js";


export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: customFetchBase,
    endpoints: (build) => ({
        getUserActivity: build.query({
            query: () => ({
                url: `/users/activity`,
                method: 'GET',
            }),
            providesTags: ['User']
        }),

    }),
    tagTypes: ['User', 'Questions','Answers']
})

export const {
    useGetUserActivityQuery,
    usePrefetch,
} = authApi;