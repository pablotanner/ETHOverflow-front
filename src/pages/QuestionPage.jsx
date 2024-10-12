import {useParams} from "react-router-dom";
import Question from "../components/post/question.jsx";
import Answer from "../components/answer/answer.jsx";
import {TabsContent, TabsTrigger, Tabs, TabsList} from "../components/tabs/tabs.tsx";
import {useState} from "react";


const QuestionPage = () => {
    const useParam = useParams();
    const {id} = useParam;

    const [sort, setSort] = useState('rating');

    const question = {
        id: 1,
        user: 'user123',
        title: 'Hello World',
        body: 'Welcome to learning React!',
        rating: 25,
        tags: ['react', 'javascript', 'webdev'],
        answers: [
            {id: 1, body: 'Great post!', user: 'Pablo Tanner'},
            {id: 2, body: 'Thanks for sharing!', user: 'John Doe'}
        ]
    }

    const comments = [
        {id: 1, body: 'Great post!', user: 'Test User'},
        {id: 2, body: 'Thanks for sharing!', user: 'Test User'}
    ]

    return (
        <div className="p-4 flex flex-col gap-2 w-full">
            <Question question={question}/>

            <div className="flex flex-col gap-2 p-4">
                <div className="flex justify-between">
                    {question?.answers?.length} Answers
                    <div className="flex flex-row gap-4 items-center">
                        Sort by:
                        <Tabs value={sort}>
                            <TabsList onClick={(e) => setSort(e.target?.innerHTML?.toLowerCase())}>
                                <TabsTrigger value="rating">Rating</TabsTrigger>
                                <TabsTrigger value="oldest">Oldest</TabsTrigger>
                                <TabsTrigger value="newest">Newest</TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </div>
                </div>


                <div className="h-[1px] w-full bg-gray-200"/>
                {
                    question?.answers?.map((answer) => (
                        <>
                            <Answer answer={answer} comments={comments}/>

                            <div className="h-[1px] w-full bg-gray-200"/>
                        </>
                    ))
                }
            </div>
        </div>
    )
}

export default QuestionPage