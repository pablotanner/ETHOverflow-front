import Question from "../components/question/question.jsx";
import {useNavigate} from "react-router-dom";
import {useGetQuestionsQuery} from "../services/api/questionApi.js";
import Spinner from "../components/spinner/spinner.jsx";
import {Button} from "../utils/moving-border.jsx";
import {Tabs, TabsList, TabsTrigger} from "../components/tabs/tabs.tsx";
import {useState} from "react";
const HomePage = () => {

    const {
        data: questions,
        isLoading,
        isError: isQuestionsError
    } = useGetQuestionsQuery();




    const navigate = useNavigate()


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


    if (isLoading) {
        return <Spinner/>
    }
    return (
        <div className="gap-4 p-4 w-full">
            <h1 className="flex flex-row flex-wrap gap-2 items-center justify-between ">Welcome to ETHOverflow


                <div>
                    <Button
                        className="bg-white p-3 dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800"

                        onClick={() => navigate("/questions/create")}
                    >
                        Create Question
                    </Button>
                </div>

            </h1>
            <p className="flex flex-row justify-between gap-2 items-center">
                The best place to ask questions about ETH Courses.

                <div className="flex flex-row gap-4 mt-4 items-center">
                    Sort by:
                    <Tabs value={sort}>
                        <TabsList onClick={(e) => setSort(e.target?.innerHTML?.toLowerCase())}>
                            <TabsTrigger value="rating">Rating</TabsTrigger>
                            <TabsTrigger value="newest">Newest</TabsTrigger>
                            <TabsTrigger value="recent activity">Recent Activity</TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>
            </p>


            <div className="flex flex-col gap-6 mt-3 w-full">
                {(!isQuestionsError && questions?.length) ?
                    [...questions].sort((a, b) => {
                        if (sort === 'rating') {
                            return b?.total_vote_count - a?.total_vote_count;
                        } else if (sort === 'newest') {
                            return new Date(b.date_answered) - new Date(a.date_answered);
                        } else if (sort === 'recent activity') {
                            // Sort by the most recent activity (answers or comments)
                            return getLastActivityDate(b) - getLastActivityDate(a);
                        }
                    })?.map((question) => (
                        <Question key={question?.id} question={question}/>
                    )) : null
                }

                {
                    !questions?.length && !isQuestionsError && <div className="text-gray-500">
                        There are currently no questions available
                    </div>

                }

                {
                    isQuestionsError && <div className="text-red-500">Something went wrong</div>
                }


            </div>


        </div>
    )
}

export default HomePage;