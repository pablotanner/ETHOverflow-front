import {useParams} from "react-router-dom";


const QuestionPage = () => {
    const useParam = useParams();
    const {id} = useParam;


    return (
        <div>
            Question Page for {id}
        </div>
    )
}

export default QuestionPage