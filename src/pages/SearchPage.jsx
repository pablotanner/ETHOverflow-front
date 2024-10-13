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

            </div>


            <div className="flex flex-col gap-6 mt-4 w-full">
                {!questionsIsError?
                    questions?.map((question) => (
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