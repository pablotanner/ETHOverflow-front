import {ArrowBigDown, ArrowBigUp, ArrowDown, ArrowUp} from "lucide-react";


const Ratings = ({ rating, direction }) => {

    Ratings.defaultProps = {
        direction: 'vertical'
    }

    if (direction === 'horizontal') {
        return (
            <div className="flex items-center justify-start gap-[2px]">
                <ArrowBigUp className="text-gray-400 hover:text-indigo-400 hover:cursor-pointer" width={16}/>
                <p className="font-semibold text-gray-700 text-xs">{rating || 0}</p>
                <ArrowBigDown className="text-gray-400 hover:text-red-400 hover:cursor-pointer"  width={16}/>
            </div>
        )
    }
    else {
        return (
            <div className="flex flex-col items-center justify-start">
                <ArrowUp className="text-gray-400 hover:text-indigo-400 hover:cursor-pointer" />
                <p className="font-bold text-lg">{rating || 0}</p>
                <ArrowDown className="text-gray-400 hover:text-red-400 hover:cursor-pointer"/>
            </div>
        )
    }


}

export default Ratings;