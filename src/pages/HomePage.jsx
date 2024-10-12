import {Button} from "../components/button/button.tsx";
import Question from "../components/post/question.jsx";
import {useNavigate} from "react-router-dom";
const HomePage = () => {
    const navigate = useNavigate()
    return (
        <div className="flex justify-center flex-col items-center gap-4">

            <div className="flex flex-col justify-center items-center">
                New Question
                <Button className="w-32 hover:border-gray-300" variant="outline"
                        onClick={() => navigate("/questions/create")}
                >
                    Ask
                </Button>
            </div>

            <div className="flex flex-col justify-center items-center">
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