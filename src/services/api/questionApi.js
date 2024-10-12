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
            providesTags: (result, error, id) => [{ type: 'Question', id }],
        }),
        getQuestions: build.query({
            query: () => ({
                url: `/questions`,
                method: 'GET',
            }),
            providesTags: ['Questions']
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
            invalidatesTags: ['Questions', 'User']
        }),
        createCommentToQuestion: build.mutation({
            query: (data) => ({
                url: `/questions/${data.question_id}/answers/${data.answer_id}/comments`,
                method: 'POST',
                body: data.body
            }),
            async onQueryStarted(arg, { queryFulfilled }) {
                toast({
                    title: "Adding Comment...",
                    variant: "loading",
                })
                queryFulfilled
                    .then(() => {
                        toast({
                            title: "Success",
                            description: "Comment created successfully.",
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
            // Invalidate question with id when a comment is created
            invalidatesTags: (result, error, {question_id}) => [{ type: 'Question', id: question_id }],
        }),
        createComment: build.mutation({
            query: (data) => ({
                url: `/questions/${data.question_id}/answers/${data?.answer_id}/comments`,
                method: 'POST',
                body: data.body
            }),
            async onQueryStarted(arg, { queryFulfilled }) {
                toast({
                    title: "Adding Comment...",
                    variant: "loading",
                })
                queryFulfilled
                    .then(() => {
                        toast({
                            title: "Success",
                            description: "Comment created successfully.",
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
            // Invalidate question with id when a comment is created
            invalidatesTags: (result, error, {question_id}) => [{ type: 'Question', id: question_id }],
        }),
        createAnswer: build.mutation({
            query: (data) => ({
                url: `/questions/${data.question_id}/answers`,
                method: 'POST',
                body: data.body,

            }),
            async onQueryStarted(arg, { queryFulfilled }) {
                toast({
                    title: "Adding Answer...",
                    variant: "loading",
                })
                queryFulfilled
                    .then(() => {
                        toast({
                            title: "Success",
                            description: "Answer created successfully.",
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
            // Invalidate question with id when a comment is created
            invalidatesTags: (result, error, {question_id}) => [{ type: 'Question', id: question_id }],
        }),
    }),
    overrideExisting: false,
})

export const { useGetQuestionsQuery, useGetQuestionQuery,
    useCreateQuestionMutation, useCreateCommentMutation, useCreateAnswerMutation
} = questionsApi;
