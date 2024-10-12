
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {useState} from "react";
import {Input} from "../components/input/input.tsx";
import {TagInput} from "emblor";
import {Button} from "../components/button/button.tsx";
import {useCreateQuestionMutation} from "../services/api/questionApi.js";

const CreateQuestionPage = () => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('');

    const [tags, setTags] = useState([])
    const [activeTagIndex, setActiveTagIndex] = useState(null)

    const [createQuestion] = useCreateQuestionMutation()

    return (
        <div className="flex flex-col gap-4 p-4 w-full">
            <h1>Ask a Question</h1>

            <div className="p-4 shadow-lg border border-border rounded-lg flex flex-col gap-1">
                <h4 className="font-semibold text-lg">Title</h4>
                <p className="text-md">
                    This is where the user will input the title of the question.
                </p>
                <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. How to estimate Kolmogorov complexity"/>
            </div>

            <div className="p-4 shadow-lg border border-border rounded-lg flex flex-col gap-1">
                <h4 className="font-semibold text-lg">Content</h4>
                <p className="text-md">
                    This is where the user will input the content of the question.
                </p>
                <ReactQuill theme="snow" value={content} onChange={setContent}/>

            </div>


            <div className="p-4 shadow-lg border border-border rounded-lg flex flex-col gap-1">
                <h4 className="font-semibold text-lg">Tags</h4>
                <p className="text-md">
                    Select tags and separate them with a comma.
                </p>
                <TagInput
                    variant="default"
                    placeholder="Enter tags "
                    tags={tags}
                    setTags={(newTags) => {
                        setTags(newTags);
                    }}
                    activeTagIndex={activeTagIndex}
                    setActiveTagIndex={setActiveTagIndex}
                />
            </div>

            <Button className="w-32 hover:border-gray-300" variant="outline"
                onClick={() => {
                    console.log(content)
                    createQuestion({
                        title: title,
                        content: content,
                        tags: tags.map((tag) => tag.text),
                    })
                }}
            >
                Submit
            </Button>
        </div>
    )
}

export default CreateQuestionPage;