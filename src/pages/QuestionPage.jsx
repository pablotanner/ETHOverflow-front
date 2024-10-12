import {useNavigate, useParams} from "react-router-dom";
import Question from "../components/question/question.jsx";
import Answer from "../components/answer/answer.jsx";
import {TabsTrigger, Tabs, TabsList} from "../components/tabs/tabs.tsx";
import {useState} from "react";
import {Button} from "../components/button/button.tsx";
import {ArrowLeft} from "lucide-react";
import {useGetQuestionQuery} from "../services/api/questionApi.js";
import Comment from "../components/comment/comment.jsx";
import Spinner from "../components/spinner/spinner.jsx";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "../components/dialog/dialog.tsx";
import {Input} from "../components/input/input.tsx";


const QuestionPage = () => {
    const useParam = useParams();
    const {id} = useParam;
    const navigate =  useNavigate()


    const {
        data: question,
        isLoading: isQuestionLoading,
        isError: isQuestionError
   } = useGetQuestionQuery(id);

    const [sort, setSort] = useState('rating');

    if (isQuestionLoading) {
        return <Spinner/>
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
                                defaultValue="Good Question"
                                className="w-full"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" variant="outline">Comment</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <div className="h-[1px] w-full bg-gray-200"/>

            {question?.comments_of_questions_list.map((comment) => (
            <Comment comment={comment}/>
            ))}


            <div className="flex flex-col gap-2 p-4">
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


                <div className="h-[1px] w-full bg-gray-200"/>


                {
                    question?.answers_list?.map((answer) => (
                        <>
                            <Answer answer={answer} comments={answer?.comments_list}/>

                            <div className="h-[1px] w-full bg-gray-200"/>
                        </>
                    ))
                }
            </div>
        </div>
    )
}

export default QuestionPage