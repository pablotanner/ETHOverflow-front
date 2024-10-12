import ReactQuill from "react-quill";

import katex from 'katex';
import 'katex/dist/katex.min.css';

const formula = () => {
    const toolbar = this.quill.getModule('toolbar');
    toolbar.addHandler('formula', () => {
        const value = prompt('Enter formula');
        this.quill.focus();
        this.quill.insertText(this.quill.getLength(), `\\(${value}\\)`);
    });
}

const Editor = ({value, setValue}) => {

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