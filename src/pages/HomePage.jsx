import {Button} from "../components/button/button.tsx";
import Question from "../components/post/question.jsx";
const HomePage = () => {
    const posts = [
        { id: 1, title: 'Hello World', body: 'Welcome to learning React!', rating: 5,
            tags: ['react', 'javascript', 'webdev']


        },
        { id: 2, title: 'Installation', body: 'You can install React from npm.', rating: -1,
            tags: ['react', 'javascript', 'webdev']

        },
        { id: 3, title: 'JSX', body: 'JSX is a syntax extension for JavaScript.', rating: 3,
            tags: ['react', 'javascript', 'webdev']},
    ]


    return (
        <div className="flex justify-center flex-col items-center">

            <div className="card">
                <div className="flex gap-3 flex-col">
                    {
                        posts.map((post) => <Question question={post} />)
                    }
                </div>
                <Button >
                    Button
                </Button>
            </div>
        </div>
    )
}

export default HomePage;