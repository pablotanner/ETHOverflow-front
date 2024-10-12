import customFetchBase from "./customFetchBase.js";
import {authApi} from "./authApi.js";

export const questionsApi = authApi.injectEndpoints({
    reducerPath: 'questionsApi',
    baseQuery: customFetchBase,
    endpoints: (build) => ({
        getQuestion: build.query({
            query: (id) => ({
                url: `/questions/${id}`,
                method: 'GET',
            }),
            providesTags: (result, error, id) => [{ type: 'Payment', id }],
        }),
        getQuestions: build.query({
            query: () => ({
                url: `/questions`,
                method: 'GET',
            }),
            providesTags: ['questions']
        }),
    }),
    overrideExisting: false,
})

export const { useGetQuestionQuery, useGetQuestionsQuery } = questionsApi;
