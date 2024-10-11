


const Post = ({ post }) => {
    return (
        <div className="bg-gray-200 border-blue-500 rounded-lg p-1 text-black">
            <h1 className="">{post?.title}</h1>
            <p>{post?.body}</p>
        </div>
    );
}

export default Post;