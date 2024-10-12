import customFetchBase from "./customFetchBase.js";
import {authApi} from "./authApi.js";
import {toast} from "../../components/toast/use-toast.tsx";

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
        createQuestion: build.mutation({
            query: (body) => ({
                url: `/questions`,
                method: 'POST',
                body
            }),
            async onQueryStarted(arg, { queryFulfilled }) {
                toast({
                    title: "Creating Question...",
                    variant: "loading",
                })
                queryFulfilled
                    .then(() => {
                        toast({
                            title: "Success",
                            description: "Question created successfully.",
                            variant: "success",
                        });
                    })
                    .catch(() => {
                        toast({
                            title: "Uh oh! Something went wrong.",
                            description: "There was a problem with your request.",
                            variant: "error",
                        });
                    })
            },
            invalidatesTags: ['Questions']
        }),
    }),
    overrideExisting: false,
})

export const { useGetQuestionQuery, useGetQuestionsQuery,
    useCreateQuestionMutation
} = questionsApi;
