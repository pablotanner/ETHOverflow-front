import Question from "../post/question.jsx";
import Ratings from "../ratings.jsx";
import {Avatar, AvatarFallback} from "../avatar/avatar.tsx";


const Answer = ({ answer }) => {
    return (
        <div className="bg-white border-blue-500 rounded-lg p-3 gap-1 text-black flex flex-col relative">
            <div className="flex flex-row gap-2 items-center">
                <Avatar className="w-5 h-5 text-xs">
                    <AvatarFallback>
                        <p>{answer?.user[0]}</p>
                    </AvatarFallback>
                </Avatar>
                <p className="text-gray-500 text-xs">{answer?.user}</p>
            </div>

            <div className="flex items-center text-sm ml-7">
                <p>{answer?.body}</p>
            </div>
            <div className="flex flex-row items-center gap-4">
                <Ratings direction='horizontal' rating={answer?.rating}/>

                <p className="text-xs text-gray-500">
                    22 hours ago
                </p>
            </div>
        </div>
    )
}

export default Answer;