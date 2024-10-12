import {Button} from "../components/button/button.tsx";
import Question from "../components/question/question.jsx";
import {useNavigate} from "react-router-dom";
import {useGetQuestionsQuery} from "../services/api/questionApi.js";
import Spinner from "../components/spinner/spinner.jsx";
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
            <h1 className="relative ">Welcome to ETHOverflow

                <Button className="w-32 hover:border-gray-300 absolute top-2 right-0" variant="outline"
                        onClick={() => navigate("/questions/create")}
                >
                    Create Question
                </Button>
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