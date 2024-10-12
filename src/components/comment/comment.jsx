

const Comment = ({ comment }) => {
    return (
        <div className="text-xs inline-flex float-left m-0 gap-1">
            <p className="text-gray-500">
                {comment?.created_by}:
            </p>
            <p>{comment.content}</p>
        </div>
    );
}

export default Comment;