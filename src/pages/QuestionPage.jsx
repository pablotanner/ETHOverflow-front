import {useParams} from "react-router-dom";
import Question from "../components/post/question.jsx";
import Answer from "../components/answer/answer.jsx";


const QuestionPage = () => {
    const useParam = useParams();
    const {id} = useParam;

    const question = {
        id: 1,
        user: 'user123',
        title: 'Hello World',
        body: 'Welcome to learning React!',
        rating: 5,
        tags: ['react', 'javascript', 'webdev'],
        answers: [
            {id: 1, body: 'Great post!', user: 'Pablo Tanner'},
            {id: 2, body: 'Thanks for sharing!', user: 'John Doe'}
        ]
    }
    return (
        <div className="p-4 flex flex-col gap-2 w-full">
            Question Page for {id}

            <Question question={question}/>

            <div className="flex flex-col gap-2 p-4">
                {question?.answers?.length} Answers

                <div className="h-[1px] w-full bg-gray-200"/>
                {
                    question?.answers?.map((answer) => (
                        <>
                            <Answer answer={answer}/>

                            <div className="h-[1px] w-full bg-gray-200"/>
                        </>
                    ))
                }
            </div>
        </div>
    )
}

export default QuestionPage