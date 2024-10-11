import {useNavigate} from "react-router-dom";
import {Button} from "../button/button.tsx";
import {ArrowDown, ArrowUp} from "lucide-react";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "../dropdown/dropdown.tsx";
import {DotsVerticalIcon} from "@radix-ui/react-icons";
import Ratings from "../ratings.jsx";


const Question = ({ question }) => {

    const navigate = useNavigate();

    return (
        <div className="bg-gray-100 border-blue-500 rounded-lg p-3 gap-1 text-black flex flex-col relative" onClick={() => navigate("/questions/1")}>
            <h1 className="font-semibold">{question?.title}</h1>
            <p className="text-gray-400 text-sm">{question?.user}</p>
            <div className="h-[1px] bg-gray-300 w-full"/>
            <div className="flex gap-2"
                 onClick={() => navigate(`/questions/${post?.id}`)}
            >
                <Ratings rating={question?.rating}/>
                <p>{question?.body}</p>

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