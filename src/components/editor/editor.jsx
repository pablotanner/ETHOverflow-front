import katex from 'katex';

import ReactQuill from "react-quill";

window.katex = katex;

import 'react-quill/dist/quill.snow.css';

import {useEffect, useRef} from "react";

const Editor = ({value, setValue}) => {
    const quillRef = useRef(null); // Create a Ref

    useEffect(() => {
        if (quillRef != null && quillRef.current != null) {
            const toolbar = quillRef.current.getEditor().getModule("toolbar");
            toolbar.addHandler("formula", function() {
                const value = prompt('Enter formula');
                this.quill.focus();
                let cursorPosition = this.quill.getSelection().index;
                this.quill.insertEmbed(cursorPosition, 'formula', value);
            });
        }
    }, []);
    return (
        <ReactQuill
            theme="snow"
            value={value}
            onChange={setValue}

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