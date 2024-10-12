import {Input} from "../input/input.tsx";
import {MagnifyingGlassIcon} from "@radix-ui/react-icons";
import {useNavigate} from "react-router-dom";
import {useGetUserActivityQuery, usePrefetch} from "../../services/api/authApi.js";
import {useDispatch} from "react-redux";


const Navbar = () => {
    const navigate = useNavigate();

    const prefetchQuestions = usePrefetch('getQuestions');

    const prefetchUser = usePrefetch('getUserActivity');

    prefetchQuestions();
    prefetchUser();

    const MenuItem = ({children, link}) => {
        return (
            <div className="hover:cursor-pointer text-black hover:text-primary text-lg select-none font-semibold"
                onClick={() => navigate(link)}
            >
                {children}
            </div>
        )
    }

    return (
        <nav className="px-12 py-4 border-b border-b-gray-200 flex flex-row gap-6 md:gap-16 lg:gap-24 items-center justify-center w-full">
            <div>
                <img src={"/logo.png"} className="hover:opacity-60 cursor-pointer" width={100} onClick={() => navigate("/")}/>
            </div>

            <MenuItem link={"/"}>Home</MenuItem>
            <MenuItem link={"/about"}>About</MenuItem>
            <MenuItem link={"/courses"}>Courses</MenuItem>
            <div className="relative">
                <MagnifyingGlassIcon className="absolute top-1/2 left-2 transform -translate-y-1/2 text-gray-400"/>
                <Input className="h-8 pl-8"/>
            </div>

            <MenuItem link={"/badges"}>Achievements</MenuItem>
        </nav>
    )
}

export default Navbar;