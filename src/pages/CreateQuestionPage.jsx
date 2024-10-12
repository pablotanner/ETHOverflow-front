
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {useState} from "react";
import {Input} from "../components/input/input.tsx";
import {TagInput} from "emblor";
import {Button} from "../components/button/button.tsx";

const CreateQuestionPage = () => {
    const [value, setValue] = useState('');

    const [tags, setTags] = useState([])
    const [activeTagIndex, setActiveTagIndex] = useState(null)


    return (
        <div className="flex flex-col gap-4 p-3">
            <h1 className="text-lg">Ask a Question</h1>

            <div className="p-4 shadow-lg border border-border rounded-lg flex flex-col gap-1">
                <h4 className="font-semibold text-sm">Title</h4>
                <p className="text-xs">
                    This is where the user will input the title of the question.
                </p>
                <Input placeholder="e.g. How to estimate Kolmogorov complexity"/>
            </div>

            <div className="p-4 shadow-lg border border-border rounded-lg flex flex-col gap-1">
                <h4 className="font-semibold text-sm">Content</h4>
                <p className="text-xs">
                    This is where the user will input the content of the question.
                </p>
                <ReactQuill theme="snow" value={value} onChange={setValue}/>

            </div>


            <div className="p-4 shadow-lg border border-border rounded-lg flex flex-col gap-1">
                <h4 className="font-semibold text-sm">Tags</h4>
                <p className="text-xs">
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
                onClick={() => console.log(value)}
            >
                Submit
            </Button>
        </div>
    )
}

export default CreateQuestionPage;