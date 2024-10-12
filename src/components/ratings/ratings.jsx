import {ArrowBigDown, ArrowBigUp, ArrowDown, ArrowUp} from "lucide-react";
import {useCreateAnswerVoteMutation, useCreateQuestionVoteMutation} from "../../services/api/questionApi.js";


const Ratings = ({ rating, question, answer, direction }) => {

    Ratings.defaultProps = {
        direction: 'vertical'
    }

    const [sendVoteQuestion] = useCreateQuestionVoteMutation();

    const [sendVoteAnswer] = useCreateAnswerVoteMutation();

    if (direction === 'horizontal') {
        const isUpVoted = answer?.user_vote_type === 1;
        const isDownVoted = answer?.user_vote_type === -1;


        return (
            <div className="flex items-center justify-start gap-[2px]" >
                <ArrowBigUp
                    onClick={() => {
                        sendVoteAnswer({
                            answer_id: answer?.answer_id,
                            body: {
                                vote_type: isUpVoted ? 0 : 1
                            }
                        })
                    }}
                    data-testid="upvote"
                    className="text-gray-400 hover:text-indigo-400 hover:cursor-pointer data-[testid='upvote']:text-indigo-400"
                    width={22}
                />

                <p className="font-semibold text-gray-700 text-xs">{rating || 0}</p>
                <ArrowBigDown
                    onClick={() => {
                        sendVoteAnswer({
                            answer_id: answer?.answer_id,
                            body: {
                                vote_type: isDownVoted ? 0 : -1
                            }
                        })
                    }}
                    data-testid="downvote"
                    className="text-gray-400 hover:text-red-400 hover:cursor-pointer data-[testid='downvote']:text-red-400"

                    width={22}/>
            </div>
        )
    }
    else {
        return (
            <div className="flex flex-col items-center justify-start">
                <ArrowUp
                    onClick={() => {
                        sendVoteQuestion({
                            question_id: question?.id,
                            body: {
                                vote_type: 1
                            }
                        })
                    }}

                    className="text-primary-foreground hover:text-indigo-300 hover:cursor-pointer" />
                <p className="font-bold text-lg">{rating || 0}</p>
                <ArrowDown
                    onClick={() => {
                        sendVoteQuestion({
                            question_id: question?.id,
                            body: {
                                vote_type: -1
                            }
                        })
                    }}
                    className="text-primary-foreground hover:text-red-400 hover:cursor-pointer"/>
            </div>
        )
    }


}

export default Ratings;