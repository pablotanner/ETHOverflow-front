import {useLocation, useNavigate} from "react-router-dom";
import {Button} from "../button/button.tsx";
import {ArrowDown, ArrowUp, ExternalLink} from "lucide-react";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "../dropdown/dropdown.tsx";
import {DotsVerticalIcon} from "@radix-ui/react-icons";
import Ratings from "../ratings/ratings.jsx";
import {Badge} from "../badge/badge.tsx";
import DOMPurify from 'dompurify';
import {
    useCreateQuestionVoteMutation,
    useDeleteQuestionMutation,
    useEditQuestionMutation
} from "../../services/api/questionApi.js";
import {useGetUserActivityQuery} from "../../services/api/authApi.js";
import {toast} from "../toast/use-toast.tsx";
import {useState} from "react";
import Editor from "../editor/editor.jsx";



const Question = ({ question }) => {

    const navigate = useNavigate();

    const location = useLocation();

    const [deleteQuestion, {isLoading}] = useDeleteQuestionMutation();

    const [editQuestion, {isLoading: isLoadingEditQuestion}] = useEditQuestionMutation();

    const {
        data: user,
    } = useGetUserActivityQuery();

    const [isEditing, setIsEditing] = useState(false);

    const [questionContent, setQuestionContent] = useState(question?.content);

    const isOwner = user?.email === question?.created_by;


    const formatDate = (date) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString(undefined, options);
    }


    return (
        <div
            data-page={location.pathname !== "/questions/" + question?.id}
            className="bg-slate-[#08407E] data-[page='true']:hover:[#4D7DBF] data-[page='true']:hover:cursor-pointer
            text-primary-foreground border-blue-500 rounded-lg p-3 gap-1 text-black flex flex-col relative"
            onClick={() => {
                if (location.pathname !== "/questions/" + question?.id) {
                    navigate("/questions/" + question?.id)
                }
            }}
            >

            <h1 className="font-semibold flex flex-row gap-6 items-center">{question?.title}


            </h1>
            <p className="text-primary-foreground text-sm">by {question?.creator?.display_name} on {formatDate(question?.date_asked)}</p>
            <div className="h-[1px] bg-gray-300 w-full"/>

            <div className="bottom-3 right-3 absolute flex gap-2 overflow-auto">
                {question?.tags?.length ? question?.tags?.map((tag) => (
                    <Badge variant="secondary"
                           className="hover:cursor-pointer"
                           onClick={() => navigate(`/search/${tag}`)}
                    >
                        {tag}
                    </Badge>
                )) : null}
            </div>

            <div className="flex gap-2 overflow-auto">
                <Ratings question={question} rating={question?.reputation}/>

                {
                    isEditing ?
                        <Editor value={questionContent} setValue={
                            (content) => setQuestionContent(content)
                        }/>
                        :
                        <div
                            dangerouslySetInnerHTML={{
                                __html: question?.content
                        }}/>
                }

                {isEditing ?
                    <div className="flex flex-row gap-2 text-black">
                        <Button variant="outline"
                                onClick={() => {
                                    setIsEditing(false)
                                    setQuestionContent(question?.content)
                                }}
                        >
                            Cancel
                        </Button>
                        <Button variant="outline"
                                onClick={() => {
                                    setIsEditing(false)
                                    editQuestion({
                                        question_id: question?.id,
                                        body: {
                                            content: questionContent
                                        }
                                    }).then((res) => {
                                        if (res.error) {
                                            console.log(res.error)
                                        }
                                    })
                                }}
                        >
                            Save
                        </Button>
                    </div> : null

                }


                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <DotsVerticalIcon
                            className="text-white hover:cursor-pointer hover:text-gray-200 absolute top-4 right-4"/>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem hidden={!isOwner} onClick={() => {
                            toast({
                                title: "Your report has been submitted to someone who cares",
                                variant: "success",
                            })
                        }}>
                            Report
                        </DropdownMenuItem>
                        {
                            isOwner ? <DropdownMenuItem
                                onClick={() => {
                                    setIsEditing(true)
                                }}
                            >
                                Edit
                            </DropdownMenuItem> : null
                        }


                        {
                            isOwner ? (
                                <DropdownMenuItem
                                    onClick={() => {
                                        deleteQuestion(question?.id).then((res) => {
                                            if (res.error) {
                                                console.log(res.error)
                                            } else{
                                                navigate("/")
                                            }
                                        })

                                    }}
                                >
                                    Delete
                                </DropdownMenuItem>
                            ) : null
                        }

                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>

    );
}

export default Question;