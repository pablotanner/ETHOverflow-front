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
        getQuestionSearch: build.query({
            query: (query) => ({
                url: `/search?query=${query}`,
                method: 'GET',
            }),

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
                url: `/questions/${data.question_id}/comments`,
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
            invalidatesTags: (result, error, {question_id}) => [{ type: 'Question', id: question_id }, 'Questions', 'User']
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
            invalidatesTags: (result, error, {question_id}) => [{ type: 'Question', id: question_id }, 'Questions', 'User']
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
            invalidatesTags: (result, error, {question_id}) => [{ type: 'Question', id: question_id }, 'Questions', 'User']
        }),
        editAnswer: build.mutation({
            query: (data) => ({
                url: `/answers/${data.answer_id}`,
                method: 'PUT',
                body: data.body,

            }),
            async onQueryStarted(arg, { queryFulfilled }) {
                toast({
                    title: "Editing Answer...",
                    variant: "loading",
                })
                queryFulfilled
                    .then(() => {
                        toast({
                            title: "Success",
                            description: "Answer edited successfully.",
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
            invalidatesTags: (result, error, {question_id}) => [{ type: 'Question', id: question_id }, 'Questions', 'User']
        }),
        editQuestion: build.mutation({
            query: (data) => ({
                url: `/questions/${data.question_id}`,
                method: 'PUT',
                body: data.body,

            }),
            async onQueryStarted(arg, { queryFulfilled }) {
                toast({
                    title: "Editing Question...",
                    variant: "loading",
                })
                queryFulfilled
                    .then(() => {
                        toast({
                            title: "Success",
                            description: "Question edited successfully.",
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
            invalidatesTags: (result, error, {question_id}) => [{ type: 'Question', id: question_id }, 'Questions', 'User']
        }),
        deleteQuestion: build.mutation({
            query: (question_id) => ({
                url: `/questions/${question_id}`,
                method: 'DELETE',

            }),
            async onQueryStarted(arg, { queryFulfilled }) {
                toast({
                    title: "Deleting Question...",
                    variant: "loading",
                })
                queryFulfilled
                    .then(() => {
                        toast({
                            title: "Success",
                            description: "Question deleted successfully.",
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
            invalidatesTags: ['Questions', 'User']
        }),

        createQuestionVote: build.mutation({
            query: (data) => ({
                url: `/questions/${data.question_id}/vote`,
                method: 'POST',
                body: data.body,

            }),
            invalidatesTags: (result, error, {question_id}) => [{ type: 'Question', id: question_id }, 'Questions', 'User']
        }),
        createAnswerVote: build.mutation({
            query: (data) => ({
                url: `/answers/${data.answer_id}/vote`,
                method: 'POST',
                body: data.body,

            }),
            invalidatesTags: (result, error, {question_id}) => [{ type: 'Question', id: question_id }, 'Questions', 'User']
        }),
        markAnswer: build.mutation({
            query: (data) => ({
                url: `/questions/${data.question_id}/mark-accepted/${data?.answer_id}`,
                method: 'PUT',

            }),
            invalidatesTags: (result, error, {question_id}) => [{ type: 'Question', id: question_id }, 'Questions', 'User']
        }),
    }),
    overrideExisting: false,
})

export const { useGetQuestionsQuery, useGetQuestionQuery,
    useCreateQuestionMutation, useCreateCommentMutation, useCreateAnswerMutation, useCreateCommentToQuestionMutation, useDeleteQuestionMutation,
    useCreateQuestionVoteMutation, useCreateAnswerVoteMutation, useEditAnswerMutation, useEditQuestionMutation, useGetQuestionSearchQuery, useMarkAnswerMutation
} = questionsApi;
