import Ratings from "../ratings/ratings.jsx";
import {Avatar, AvatarFallback} from "../avatar/avatar.tsx";
import Comment from "../comment/comment.jsx";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "../dialog/dialog.tsx";
import {Input} from "../input/input.tsx";
import {Button} from "../button/button.tsx";
import {useState} from "react";
import {
    useCreateCommentMutation,
    useEditAnswerMutation,
    useMarkAnswerMutation
} from "../../services/api/questionApi.js";
import Editor from "../editor/editor.jsx";
import {useGetUserActivityQuery} from "../../services/api/authApi.js";
import {HoverCard, HoverCardContent, HoverCardTrigger} from "../card/hover-card.tsx";
import {CalendarDays} from "lucide-react";
import {Badge} from "../badge/badge.tsx";


const Answer = ({ answer, question, comments }) => {

    const [comment, setComment] = useState('')


    // Check that user is owner of the question

    const {
        data: user,
    } = useGetUserActivityQuery();

    const [answerContent, setAnswerContent] = useState(answer?.content)

    const [markAnswer, {isLoading: isMarkAnswerLoading}] = useMarkAnswerMutation()
    const isQuestionOwner = user?.email === question?.created_by;

    const isOwner = user?.email === answer?.created_by;


    console.log(answer, question)
    // From date, get e.g. 22 hours ago
    const formatDate = (date) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString(undefined, options);
    }

    const isAccepted = answer?.accepted
    const [createComment, {isLoading: isCreateCommentLoading}] = useCreateCommentMutation()


    const [editAnswer, {isLoading}] = useEditAnswerMutation()

    return (
        <div
            data-accepted={isAccepted}
            className="bg-white border-blue-500 rounded-lg p-3 gap-1 text-black flex flex-col relative data-[accepted='true']:border-2 data-[accepted='true']:border-amber-400">
            <div className="flex flex-row gap-2 items-center">
                <Avatar className="w-5 h-5 text-xs">
                    <AvatarFallback>
                        <p>{answer?.creator?.display_name[0] || "?"}</p>
                    </AvatarFallback>
                </Avatar>

                <HoverCard>
                    <HoverCardTrigger asChild>
                        <p className="text-gray-500 text-xs cursor-pointer">{answer?.created_by}</p>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-64">
                    <div className="flex justify-between space-x-4">
                            <Avatar>
                                <AvatarFallback>
                                    <p>{answer?.creator?.display_name[0] || "?"}</p>
                                </AvatarFallback>
                            </Avatar>
                            <div className="space-y-1">
                                <h4 className="text-sm font-semibold">{answer?.creator?.display_name}</h4>
                                <p className="text-sm">
                                    Reputation: {answer?.creator?.reputation}
                                </p>
                                <div className="flex items-center pt-2">
                                    <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
                                    <span className="text-xs text-muted-foreground">
                                        Joined on {formatDate(answer?.creator?.date_joined)}
                                </span>
                                </div>
                            </div>
                        </div>
                    </HoverCardContent>
                </HoverCard>
            </div>

            <div className="flex items-center text-sm ml-7"
                dangerouslySetInnerHTML={
                    {
                        __html:answer?.content
                    }
                }/>


            <div className="flex flex-row items-center gap-4">
                <Ratings answer={answer} direction='horizontal' rating={answer?.total_vote_count}/>

                <p className="text-xs text-gray-500">
                    {formatDate(answer?.date_answered)}
                </p>

                <Dialog>
                    <DialogTrigger asChild>
                        <div
                            className="font-semibold text-sm text-slate-800 hover:underline cursor-pointer underline-offset-2">Add
                            Comment
                        </div>
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
                                <Button type="submit" variant="outline" disabled={isCreateCommentLoading}
                                        onClick={() => {
                                            createComment({
                                                question_id: question?.id,
                                                answer_id: answer?.answer_id,
                                                body: {
                                                    content: comment
                                                }
                                            }).then((res) => {
                                                if (res.error) {
                                                    console.log(res.error)
                                                }
                                            })
                                        }}
                                >Comment</Button>

                            </DialogClose>

                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                <Dialog>
                    <DialogTrigger asChild>
                        <div
                            className="font-semibold text-sm text-slate-800 hover:underline cursor-pointer underline-offset-2"
                            hidden={!isOwner}
                        >
                            Edit
                        </div>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Edit Comment</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4 w-full">
                            <div className="flex items-center gap-4 w-full">
                                <Editor value={answerContent} setValue={setAnswerContent}/>
                            </div>
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button type="submit" variant="outline" disabled={isLoading}
                                        onClick={() => {
                                            editAnswer({
                                                answer_id: answer?.answer_id,
                                                body: {
                                                    content: answerContent
                                                }
                                            }).then((res) => {
                                                if (res.error) {
                                                    console.log(res.error)
                                                }
                                            })
                                        }}
                                >Save</Button>

                            </DialogClose>

                        </DialogFooter>
                    </DialogContent>
                </Dialog>


                <div
                    className="font-semibold text-sm text-slate-800 hover:underline cursor-pointer underline-offset-2"
                    hidden={!isQuestionOwner}
                    onClick={() => {
                        markAnswer({
                            question_id: question?.id,
                            answer_id: answer?.answer_id
                        }).then((res) => {
                            if (res.error) {
                                console.log(res.error)
                            }
                        })
                    }}
                >

                    Mark as Answer
                </div>

                <Badge variant="gold" hidden={!isAccepted}>
                    Best Answer
                </Badge>
            </div>

            <div className="flex flex-col gap-2 px-8">
                {comments?.map((comment) => (
                    <>
                        <div className="h-[1px] w-full bg-gray-200"/>
                        <Comment comment={comment}/>
                    </>
                ))}
            </div>
        </div>
    )
}

export default Answer;