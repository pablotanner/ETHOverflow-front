import {ArrowBigDown, ArrowBigUp, ArrowDown, ArrowUp} from "lucide-react";
import {useCreateAnswerVoteMutation, useCreateQuestionVoteMutation} from "../../services/api/questionApi.js";
import {useState, useEffect} from "react";

const Ratings = ({ rating, question, answer, direction }) => {

    Ratings.defaultProps = {
        direction: 'vertical'
    }

    const [sendVoteQuestion] = useCreateQuestionVoteMutation();
    const [sendVoteAnswer] = useCreateAnswerVoteMutation();

    const [currentRating, setCurrentRating] = useState(rating);
    const [userVoteType, setUserVoteType] = useState(answer?.user_vote_type || question?.user_vote_type || 0);

    useEffect(() => {
        setUserVoteType(answer?.user_vote_type || question?.user_vote_type || 0);
    }, [answer?.user_vote_type, question?.user_vote_type]);

    console.log(userVoteType, currentRating)

    const handleVote = async (voteType, isQuestion = false) => {
        const newVoteType = userVoteType === voteType ? 0 : voteType;
        const voteDifference = (newVoteType - userVoteType);

        // Optimistically update UI
        setCurrentRating(prevRating => prevRating + voteDifference);
        setUserVoteType(newVoteType);

        try {
            const response = isQuestion
                ? await sendVoteQuestion({
                    question_id: question?.id,
                    body: { vote_type: newVoteType }
                })
                : await sendVoteAnswer({
                    answer_id: answer?.answer_id,
                    body: { vote_type: newVoteType }
                });

            // Confirm the vote type based on server response
            const updatedVoteType = response.data?.user_vote_type ?? newVoteType;
            setUserVoteType(updatedVoteType);

            // If the vote type from the server differs, adjust the rating
            if (updatedVoteType !== newVoteType) {
                const serverVoteDifference = updatedVoteType - newVoteType;
                setCurrentRating(prevRating => prevRating + serverVoteDifference);
            }
        } catch (error) {
            // Revert optimistic updates in case of an error
            setCurrentRating(prevRating => prevRating - voteDifference);
            setUserVoteType(userVoteType);
        }
    };

    if (direction === 'horizontal') {
        const isUpVoted = userVoteType === 1;
        const isDownVoted = userVoteType === -1;

        return (
            <div className="flex items-center justify-start gap-[2px]">
                <ArrowBigUp
                    onClick={() => handleVote(1, false)}
                    className={`text-gray-400 hover:text-indigo-400 hover:cursor-pointer ${isUpVoted ? 'text-indigo-400' : ''}`}
                    width={22}
                />
                <p className="font-semibold text-gray-700 text-xs">{currentRating || 0}</p>
                <ArrowBigDown
                    onClick={() => handleVote(-1, false)}
                    className={`text-gray-400 hover:text-red-400 hover:cursor-pointer ${isDownVoted ? 'text-red-400' : ''}`}
                    width={22}
                />
            </div>
        );
    } else {
        const isUpVoted = userVoteType === 1;

        const isDownVoted = userVoteType === -1;

        return (
            <div className="flex flex-col items-center justify-start">
                <ArrowUp
                    onClick={() => handleVote(1, true)}
                    className={`text-primary-foreground hover:text-indigo-300 hover:cursor-pointer ${isUpVoted ? 'text-indigo-300' : ''}`}
                />
                <p className="font-bold text-lg">{currentRating || 0}</p>
                <ArrowDown
                    onClick={() => handleVote(-1, true)}
                    className={`text-primary-foreground hover:text-red-400 hover:cursor-pointer ${isDownVoted ? 'text-red-400' : ''}`}
                />
            </div>
        );
    }
};

export default Ratings;
