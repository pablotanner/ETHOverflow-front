import {ArrowBigDown, ArrowBigUp, ArrowDown, ArrowUp} from "lucide-react";
import {useCreateAnswerVoteMutation, useCreateQuestionVoteMutation} from "../../services/api/questionApi.js";
import {useState} from "react";


const Ratings = ({ rating, question, answer, direction }) => {

    Ratings.defaultProps = {
        direction: 'vertical'
    }



    const [sendVoteQuestion] = useCreateQuestionVoteMutation();

    const [sendVoteAnswer] = useCreateAnswerVoteMutation();

    const [currentRating, setCurrentRating] = useState(rating);
    const [userVoteType, setUserVoteType] = useState((answer ? answer?.user_vote_type : question?.user_vote_type) || 0);


    const handleVoteAnswer = async (voteType) => {
        const newVoteType = userVoteType === voteType ? 0 : voteType;
        const voteDifference = newVoteType - userVoteType;
        setCurrentRating(currentRating + voteDifference);
        setUserVoteType(newVoteType);

        try {
            await sendVoteAnswer({
                answer_id: answer?.answer_id,
                body: { vote_type: newVoteType }
            });
        } catch (error) {
            // In case of an error, revert the optimistic update
            setCurrentRating(currentRating - voteDifference);
            setUserVoteType(userVoteType);
        }
    };

    const handleVoteQuestion = async (voteType) => {
        // Similar logic for question vote
        const newVoteType = userVoteType === voteType ? 0 : voteType;
        const voteDifference = newVoteType - userVoteType;
        setCurrentRating(currentRating + voteDifference);
        setUserVoteType(newVoteType);

        try {
            await sendVoteQuestion({
                question_id: question?.id,
                body: { vote_type: newVoteType }
            });
        } catch (error) {
            // In case of an error, revert the optimistic update
            setCurrentRating(currentRating - voteDifference);
            setUserVoteType(userVoteType);
        }
    };

    if (direction === 'horizontal') {
        const isUpVoted = userVoteType === 1;
        const isDownVoted = userVoteType === -1;

        return (
            <div className="flex items-center justify-start gap-[2px]">
                <ArrowBigUp
                    onClick={() => handleVoteAnswer(1)}
                    className={`text-gray-400 hover:text-indigo-400 hover:cursor-pointer ${isUpVoted ? 'text-indigo-400' : ''}`}
                    width={22}
                />
                <p className="font-semibold text-gray-700 text-xs">{currentRating || 0}</p>
                <ArrowBigDown
                    onClick={() => handleVoteAnswer(-1)}
                    className={`text-gray-400 hover:text-red-400 hover:cursor-pointer ${isDownVoted ? 'text-red-400' : ''}`}
                    width={22}
                />
            </div>
        );
    } else {
        return (
            <div className="flex flex-col items-center justify-start">
                <ArrowUp
                    onClick={() => handleVoteQuestion(1)}
                    className={`text-primary-foreground hover:text-indigo-300 hover:cursor-pointer ${userVoteType === 1 ? 'text-indigo-300' : ''}`}
                />
                <p className="font-bold text-lg">{currentRating || 0}</p>
                <ArrowDown
                    onClick={() => handleVoteQuestion(-1)}
                    className={`text-primary-foreground hover:text-red-400 hover:cursor-pointer ${userVoteType === -1 ? 'text-red-400' : ''}`}
                />
            </div>
        );
    }


}

export default Ratings;