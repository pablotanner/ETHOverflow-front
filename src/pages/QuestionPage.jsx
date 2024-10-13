import {useNavigate, useParams} from "react-router-dom";
import Question from "../components/question/question.jsx";
import Answer from "../components/answer/answer.jsx";
import {TabsTrigger, Tabs, TabsList} from "../components/tabs/tabs.tsx";
import {useState} from "react";
import {Button} from "../components/button/button.tsx";
import {ArrowLeft} from "lucide-react";
import {
    useCreateAnswerMutation, useCreateCommentToQuestionMutation,
    useGetQuestionQuery
} from "../services/api/questionApi.js";
import Comment from "../components/comment/comment.jsx";
import Spinner from "../components/spinner/spinner.jsx";
import {
    Dialog, DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "../components/dialog/dialog.tsx";
import {Input} from "../components/input/input.tsx";
import Editor from "../components/editor/editor.jsx";


const QuestionPage = () => {
    const useParam = useParams();
    const {id} = useParam;
    const navigate =  useNavigate()

    const [comment, setComment] = useState('')

    const [reply, setReply] = useState('')

    const {
        data: question,
        isLoading: isQuestionLoading,
        isError: isQuestionError
   } = useGetQuestionQuery(id);

    const [createComment] = useCreateCommentToQuestionMutation()
    const [createAnswer] = useCreateAnswerMutation()

    const [sort, setSort] = useState('rating');

    if (isQuestionLoading) {
        return <Spinner/>
    } else if (isQuestionError) {
        return <div>An error occurred</div>
    }

    return (
        <div className="p-4 flex flex-col gap-2 w-full">
            <Button variant="outline" className="w-24 items-center gap-2" onClick={() =>
                navigate(-1)
            }>
                <ArrowLeft className="w-6 h-6"/>
                Back
            </Button>

            <Question question={question}/>

            <Dialog>
                <DialogTrigger asChild>
                    <div className="font-semibold text-sm text-slate-800 hover:underline cursor-pointer underline-offset-2">Add Comment</div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add Comment</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4 w-full">
                        <div className="flex items-center gap-4 w-full">
                            <Input
                                id="comment"
                                className="w-full"
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Add a comment"
                                value={comment}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="submit" variant="outline"
                                    onClick={() => {
                                        if (question && question.id) {
                                            createComment({
                                                question_id: question.id,
                                                body: {
                                                    content: comment
                                                }
                                            }).then((res) => {
                                                if (res.error) {
                                                    console.log(res.error)
                                                }
                                            })
                                        }
                                    }}
                            >Comment</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <div className="h-[1px] w-full bg-gray-200"/>

            {question?.comments_of_questions_list.map((comment) => (
            <Comment comment={comment}/>
            ))}


            <div className="flex flex-col gap-2 p-4" hidden={!question?.answers_list?.length}>
                <div className="flex justify-between">
                    {question?.answers_list?.length || 0} Answers
                    <div className="flex flex-row gap-4 items-center">
                        Sort by:
                        <Tabs value={sort}>
                            <TabsList onClick={(e) => setSort(e.target?.innerHTML?.toLowerCase())}>
                                <TabsTrigger value="rating">Rating</TabsTrigger>
                                <TabsTrigger value="oldest">Oldest</TabsTrigger>
                                <TabsTrigger value="newest">Newest</TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </div>
                </div>


                <div className="h-[1px] w-full bg-border"/>


                {
                    [...question?.answers_list]?.sort((a,b) => {
                        // First make sure that any answer with "accepted=true" is always at the top
                        if (a.accepted) {
                            return -1
                        }

                        if (sort === 'rating') {
                            return b?.total_vote_count - a?.total_vote_count
                        } else if (sort === 'oldest') {
                            return new Date(a.date_answered) - new Date(b.date_answered)
                        } else {
                            return new Date(b.date_answered) - new Date(a.date_answered)
                        }
                    }).map((answer) => (
                        <>
                            <Answer answer={answer} question={question} comments={answer?.comments_list}/>

                            <div className="h-[1px] w-full bg-border"/>
                        </>
                    ))
                }


            </div>

            <p className="text-md">
                Add Answer
            </p>
            <Editor value={reply} setValue={setReply}/>
            <Button className="w-32 hover:border-gray-300" variant="outline"

                    onClick={() => {
                        createAnswer({
                            question_id: question?.id,
                            body: {
                                content: reply
                            }
                        }).then((res) => {
                            if (res.error) {
                                console.log(res.error)
                            }
                        })
                    }}
            >
                Answer
            </Button>
        </div>
    )
}

export default QuestionPage