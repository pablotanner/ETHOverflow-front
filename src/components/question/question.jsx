import {useNavigate} from "react-router-dom";
import {Button} from "../button/button.tsx";
import {ArrowDown, ArrowUp} from "lucide-react";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "../dropdown/dropdown.tsx";
import {DotsVerticalIcon} from "@radix-ui/react-icons";
import Ratings from "../ratings/ratings.jsx";
import {Badge} from "../badge/badge.tsx";
import DOMPurify from 'dompurify';


const Question = ({ question }) => {

    const navigate = useNavigate();

    const createMarkup = (html) => {
        return  {
            __html: DOMPurify.sanitize(html)
        }
    }

    const formatDate = (date) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString(undefined, options);
    }

    return (
        <div
            className="bg-primary text-primary-foreground border-blue-500 rounded-lg p-3 gap-1 text-black flex flex-col relative"
            onClick={() => navigate("/questions/" + question?.id)}>
            <h1 className="font-semibold">{question?.title}</h1>
            <p className="text-primary-foreground text-sm">by {question?.created_by}</p>
            <p className="text-primary-foreground text-sm">{formatDate(question?.date_asked)}</p>
            <div className="h-[1px] bg-gray-300 w-full"/>

            <div className="bottom-3 right-3 absolute flex gap-2">
                {question?.tags?.length && question?.tags?.map((tag) => (
                    <Badge variant="secondary">
                        {tag}
                    </Badge>
                ))}
            </div>

            <div className="flex gap-2"
                 onClick={() => navigate(`/questions/${question?.id}`)}
            >
                <Ratings rating={question?.reputation}/>
                <div dangerouslySetInnerHTML={createMarkup(question?.content)}/>


                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <DotsVerticalIcon
                            className="text-gray-400 hover:cursor-pointer hover:text-gray-600 absolute top-1 right-1"/>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>
                            Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>

    );
}

export default Question;