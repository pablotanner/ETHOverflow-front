import Question from "../components/question/question.jsx";
import {useNavigate} from "react-router-dom";
import {useGetQuestionsQuery} from "../services/api/questionApi.js";
import Spinner from "../components/spinner/spinner.jsx";
import {Button} from "../utils/moving-border.jsx";
const HomePage = () => {

    const {
        data: questions,
        isLoading,
        isError: isQuestionsError
    } = useGetQuestionsQuery();



    const navigate = useNavigate()

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
            <p>
                The best place to ask questions about ETH Courses.
            </p>


            <div className="flex flex-col gap-6 mt-4 w-full" >
                {!isQuestionsError &&
                    questions?.map((question) => (
                        <Question key={question?.id} question={question}/>
                    ))
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