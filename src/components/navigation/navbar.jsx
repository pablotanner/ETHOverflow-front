import {Input} from "../input/input.tsx";
import {MagnifyingGlassIcon} from "@radix-ui/react-icons";
import {useNavigate} from "react-router-dom";
import {useGetUserActivityQuery, usePrefetch} from "../../services/api/authApi.js";
import {useDispatch} from "react-redux";
import {User} from "lucide-react";


const Navbar = () => {
    const navigate = useNavigate();

    const prefetchQuestions = usePrefetch('getQuestions');

    const prefetchUser = usePrefetch('getUserActivity');

    prefetchQuestions();
    prefetchUser();

    const MenuItem = ({children, link}) => {
        return (
            <div className="hover:cursor-pointer text-black hover:text-slate-600 text-lg select-none font-semibold"
                onClick={() => navigate(link)}
            >
                {children}
            </div>
        )
    }

    return (
        <nav className="px-12 py-4 border-b border-b-gray-200 flex flex-row gap-6 md:gap-8 lg:gap-18 xl:gap-24 items-center justify-center w-full overflow-auto">
            <div>
                <img src={"/logo.png"} className="hover:opacity-60 cursor-pointer min-w-16 md:min-w-24 lg:min-w-32" width={100} onClick={() => navigate("/")}/>
            </div>

            <MenuItem link={"/"}>Home</MenuItem>
            <MenuItem link={"/about"}>About</MenuItem>
            <MenuItem link={"/courses"}>Courses</MenuItem>
            <div className="relative hidden sm:flex">
                <MagnifyingGlassIcon className="absolute top-1/2 left-2 transform -translate-y-1/2 text-gray-400"/>
                <Input className="h-8 pl-8 min-w-24 md:min-w-36"

                       // on Click enter submit
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && e.target.value) {
                                 navigate(`/search/${e.target.value}`)
                            }
                          }}


                />
            </div>

            <MenuItem link={"/badges"}>Achievements</MenuItem>

            <MenuItem link={"/account"}><User/></MenuItem>
        </nav>
    )
}

export default Navbar;