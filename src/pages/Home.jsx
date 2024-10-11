import {Button} from "../components/button/button.tsx";
import Post from "../components/post/Post.jsx";
const Home = () => {
    const posts = [
        { id: 1, title: 'Hello World', body: 'Welcome to learning React!' },
        { id: 2, title: 'Installation', body: 'You can install React from npm.' },
        { id: 3, title: 'JSX', body: 'JSX is a syntax extension for JavaScript.' },
    ]


    return (
        <div className="flex justify-center flex-col items-center">
            <img src={"/logo.png"} width={240} className=""/>
            <div className="card">
                <div className="flex gap-3 flex-col">
                    {
                        posts.map((post) => <Post post={post} />)
                    }
                </div>
                <Button >
                    Button
                </Button>
            </div>
        </div>
    )
}

export default Home;