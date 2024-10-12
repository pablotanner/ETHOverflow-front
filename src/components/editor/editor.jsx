import ReactQuill from "react-quill";


const Editor = ({value, setValue}) => {

    return (
        <ReactQuill
            theme="snow"
            value={value}
            onChange={setValue}

            modules={{
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