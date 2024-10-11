import {useNavigate} from "react-router-dom";
import {Button} from "../button/button.tsx";
import {ArrowDown, ArrowUp} from "lucide-react";


const Question = ({ question }) => {

    const navigate = useNavigate();

    return (
        <div className="bg-gray-100 border-blue-500 rounded-lg p-1 text-black flex flex-col">
            <h1 className="font-semibold">{question?.title}</h1>
            <div className="h-[1px] bg-gray-300 w-full"/>
            <div className="flex items-center"
                 onClick={() => navigate(`/questions/${post?.id}`)}
            >
                <div className="flex flex-col items-center justify-start">
                    <ArrowUp className="text-gray-400"/>
                    <p className="font-bold text-lg">{question?.rating}</p>
                    <ArrowDown className="text-gray-400"/>
                </div>
                <p>{question?.body}</p>
            </div>
        </div>

    );
}

export default Question;