import {Button} from "../components/button/button.tsx";
import Question from "../components/post/question.jsx";
import {useNavigate} from "react-router-dom";
import {useToast} from "../components/toast/use-toast.tsx";
import {useGetQuestionsQuery} from "../services/api/questionApi.js";
const HomePage = () => {
    const {toast} = useToast()


    const {
        data: questions,
        isLoading: isQuestionsLoading,
        isError: isQuestionsError
    } = useGetQuestionsQuery();



    const navigate = useNavigate()
    return (
        <div className="gap-4 p-4">
            <h1>Welcome to ETHOverflow</h1>
            <p>
                The best place to ask questions about ETH Courses.
            </p>

            <Button
                onClick={() => {
                    toast({
                        title: "Scheduled: Catch up",
                        description: "Friday, February 10, 2023 at 5:57 PM",
                    })
                }}
            >
                Show Toast
            </Button>

            <div className="flex flex-col gap-4">
                {!isQuestionsError &&
                    questions?.map((question) => (
                        <Question key={question.id} question={question}/>
                    ))
                }



            </div>


            <div className="flex flex-col  text-lg">
                New Question
                <Button className="w-32 hover:border-gray-300" variant="outline"
                        onClick={() => navigate("/questions/create")}
                >
                    Ask
                </Button>
            </div>

            <div className="flex flex-col text-lg">
                View a Question
                <Button className="w-32 hover:border-gray-300" variant="outline"
                        onClick={() => navigate("/questions/1")}
                >
                    Go
                </Button>
            </div>
        </div>
    )
}

export default HomePage;