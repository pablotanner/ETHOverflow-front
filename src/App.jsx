import './App.css'
import Post from "./components/post/Post.jsx";
import {Button} from "./components/button/button.tsx";

function App() {

  const posts = [
    { id: 1, title: 'Hello World', body: 'Welcome to learning React!' },
    { id: 2, title: 'Installation', body: 'You can install React from npm.' },
    { id: 3, title: 'JSX', body: 'JSX is a syntax extension for JavaScript.' },
  ]

  return (
    <>
      <h1>ETH Overflow</h1>
      <div className="card">
        <div className="flex gap-3 flex-col">
          {
            posts.map((post) => <Post post={post} />)
          }
        </div>
          <Button >
              Click Me
          </Button>
      </div>
    </>
  )
}

export default App
