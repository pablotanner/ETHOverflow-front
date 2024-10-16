import katex from 'katex';
window.katex = katex;
import "katex/dist/katex.css";

import ReactQuill from "react-quill";
import './index.css'

import {useEffect, useRef} from "react";

const Editor = ({value, defaultValue, setValue}) => {
    const quillRef = useRef(null); // Create a Ref


    return (
        <ReactQuill
            theme="snow"
            value={value}
            onChange={setValue}
            ref={quillRef}
            defaultValue={defaultValue}
            id="editor"
            className="text-black"

            modules={{
                formula: true,
                toolbar: [
                    [{size: []}],
                    ['bold', 'italic', 'underline', 'strike'],
                    [{'list': 'ordered'}, {'list': 'bullet'},],
                    ['formula'],
                    ['clean']
                ],
            }}

        />
    )
}

export default Editor