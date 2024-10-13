import Question from "../components/question/question.jsx";
import {useNavigate, useParams} from "react-router-dom";
import {useGetQuestionSearchQuery, useGetQuestionsQuery} from "../services/api/questionApi.js";
import Spinner from "../components/spinner/spinner.jsx";
import {Button} from "../utils/moving-border.jsx";
import {useState} from "react";
import {Tabs, TabsList, TabsTrigger} from "../components/tabs/tabs.tsx";
const SearchPage = () => {

    const params = useParams();
    const query = params.query;

    const {
        data: questions,
        isLoading,
        isError: questionsIsError
    } = useGetQuestionSearchQuery(query);

    const [sort, setSort] = useState('newest');

    // Helper function to determine the latest activity date
    const getLastActivityDate = (question) => {
        const latestAnswerDate = question?.answers_list?.length
            ? new Date(Math.max(...question.answers_list.map(a => new Date(a.date_answered))))
            : new Date(0);
        const latestCommentDate = question?.comments_of_questions_list?.length
            ? new Date(Math.max(...question.comments_of_questions_list.map(c => new Date(c?.date_commented))))
            : new Date(0);

        // Return the most recent date of activity
        return new Date(Math.max(latestAnswerDate, latestCommentDate, new Date(question.date_answered)));
    };

    console.log(questions)

    //every question has answers (question?.answers_list) and comments (question?.comments_of_questions_list)
    if (isLoading) {
        return <Spinner/>
    }
    return (
        <div className="gap-4 p-4 w-full">
            <div className="flex flex-row gap-4 justify-between">

                <h1 className="flex flex-row flex-wrap gap-2 items-center justify-between ">
                    Question Search Results
                </h1>

                <div className="flex flex-row gap-4 items-center">
                    Sort by:
                    <Tabs value={sort}>
                        <TabsList onClick={(e) => setSort(e.target?.innerHTML?.toLowerCase())}>
                            <TabsTrigger value="rating">Rating</TabsTrigger>
                            <TabsTrigger value="newest">Newest</TabsTrigger>
                            <TabsTrigger value="activity">Recent Activity</TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>
            </div>


            <div className="flex flex-col gap-6 mt-4 w-full">
                {(!questionsIsError && questions?.length) ?
                    [...questions].filter((a, b) => {
                        if (sort === 'rating') {
                            return b?.total_vote_count - a?.total_vote_count
                        } else if (sort === 'newest') {
                            return new Date(b.date_answered) - new Date(a.date_answered)
                        } else {
                            return new Date(b.date_answered) - new Date(a.date_answered)
                        }
                    })?.map((question) => (
                        <Question key={question?.id} question={question}/>
                    )) : null
                }

                {
                    (!questions?.length || questionsIsError) && <div className="text-gray-500">
                        Did not find any questions for {query}
                    </div>

                }



            </div>



        </div>
    )
}

export default SearchPage;