import {ArrowBigDown, ArrowBigUp, ArrowDown, ArrowUp} from "lucide-react";


const Ratings = ({ rating, direction }) => {

    Ratings.defaultProps = {
        direction: 'vertical'
    }

    if (direction === 'horizontal') {
        return (
            <div className="flex items-center justify-start">
                <ArrowBigUp className="text-gray-400" width={16}/>
                <p className="font-semibold text-gray-700 text-xs">{rating || 0}</p>
                <ArrowBigDown className="text-gray-400" width={16}/>
            </div>
        )
    }
    else {
        return (
            <div className="flex flex-col items-center justify-start">
                <ArrowUp className="text-gray-400"/>
                <p className="font-bold text-lg">{rating || 0}</p>
                <ArrowDown className="text-gray-400"/>
            </div>
        )
    }


}

export default Ratings;