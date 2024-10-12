import 'katex';
import ReactQuill from "react-quill";

import 'katex/dist/katex.min.css';
import {useEffect, useRef} from "react";

const formula = () => {
    const toolbar = this.quill.getModule('toolbar');
    toolbar.addHandler('formula', () => {
        const value = prompt('Enter formula');
        this.quill.focus();
        this.quill.insertText(this.quill.getLength(), `\\(${value}\\)`);
    });
}

const Editor = ({value, setValue}) => {
    const quillRef = useRef(null); // Create a Ref

    useEffect(() => {
        if (quillRef != null && quillRef.current != null) {
            const toolbar = quillRef.current.getEditor().getModule("toolbar");
            toolbar.addHandler("formula", function() {
                const value = prompt('Enter formula');
                this.quill.focus();
                this.quill.insertText(this.quill.getLength(), `\\(${value}\\)`);
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