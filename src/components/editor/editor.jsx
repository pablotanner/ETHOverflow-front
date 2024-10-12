import ReactQuill from "react-quill";


const Editor = ({value, setValue}) => {

    return (
        <ReactQuill
            theme="snow"
            value={value}
            onChange={setValue}

            modules={{
                toolbar: [
                    [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
                    [{size: []}],
                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                    [{'list': 'ordered'}, {'list': 'bullet'},
                        {'indent': '-1'}, {'indent': '+1'}],
                    ['link', 'image', 'video'],
                    ['clean']
                ],
            }}

        />
    )
}

export default Editor