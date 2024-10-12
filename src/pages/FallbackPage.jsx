import {BanIcon} from "lucide-react";
import {Button} from "../components/button/button.tsx";
import {useNavigate} from "react-router-dom";


const FallbackPage = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col p-8 w-full ">
            <div className="flex flex-col w-full justify-center items-center gap-y-3 mt-12">
                <div className="text-2xl text-gray-900 font-600 flex flex-row items-center">
                    <BanIcon className="w-6 h-6 mr-4"/>
                    Page Not Found
                </div>
                <div className="text-md text-gray-600">
                    Sorry, the page you are looking for does not exist.
                </div>
                <Button variant="outline" onClick={() => navigate("/")}>
                    Go Home
                </Button>
            </div>

        </div>
    )
}


export default FallbackPage;