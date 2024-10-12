import {Button} from "../components/button/button.tsx";
import Question from "../components/post/question.jsx";
import {useNavigate} from "react-router-dom";
const HomePage = () => {
    const navigate = useNavigate()
    return (
        <div className="gap-4 p-4">
            <h1>Home</h1>

            <div className="flex flex-col justify-center items-center text-lg">
                New Question
                <Button className="w-32 hover:border-gray-300" variant="outline"
                        onClick={() => navigate("/questions/create")}
                >
                    Ask
                </Button>
            </div>

            <div className="flex flex-col justify-center items-center text-lg">
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