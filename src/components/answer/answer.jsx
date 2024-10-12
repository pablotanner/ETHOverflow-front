import Ratings from "../ratings/ratings.jsx";
import {Avatar, AvatarFallback} from "../avatar/avatar.tsx";
import Comment from "../comment/comment.jsx";


const Answer = ({ answer, comments }) => {

    // From date, get e.g. 22 hours ago
    const formatDate = (date) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString(undefined, options);
    }


    return (
        <div className="bg-white border-blue-500 rounded-lg p-3 gap-1 text-black flex flex-col relative">
            <div className="flex flex-row gap-2 items-center">
                <Avatar className="w-5 h-5 text-xs">
                    <AvatarFallback>
                        <p>{answer?.creator[0] || "?"}</p>
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
                    {formatDate(answer?.date_commented)}
                </p>
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