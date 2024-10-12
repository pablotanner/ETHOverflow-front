import Ratings from "../ratings/ratings.jsx";
import {Avatar, AvatarFallback} from "../avatar/avatar.tsx";
import Comment from "../comment/comment.jsx";
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from "../dialog/dialog.tsx";
import {Input} from "../input/input.tsx";
import {Button} from "../button/button.tsx";
import {useState} from "react";
import {useCreateCommentMutation} from "../../services/api/questionApi.js";


const Answer = ({ answer, comments }) => {

    const [comment, setComment] = useState('')

    // From date, get e.g. 22 hours ago
    const formatDate = (date) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString(undefined, options);
    }

    const [createComment] = useCreateCommentMutation()

    console.log(answer)

    return (
        <div className="bg-white border-blue-500 rounded-lg p-3 gap-1 text-black flex flex-col relative">
            <div className="flex flex-row gap-2 items-center">
                <Avatar className="w-5 h-5 text-xs">
                    <AvatarFallback>
                        <p>{answer?.creator?.display_name[0] || "?"}</p>
                    </AvatarFallback>
                </Avatar>
                <p className="text-gray-500 text-xs">{answer?.created_by}</p>
            </div>

            <div className="flex items-center text-sm ml-7">
                <p>{answer?.content}</p>
            </div>
            <div className="flex flex-row items-center gap-4">
                <Ratings direction='horizontal' rating={answer?.total_vote_count}/>

                <p className="text-xs text-gray-500">
                    {formatDate(answer?.date_answered)}
                </p>

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
                            <Button type="submit" variant="outline"
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
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
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