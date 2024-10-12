import {Avatar, AvatarFallback} from "../components/avatar/avatar.tsx";
import {Progress} from "../components/progress/progress.tsx";


const BadgesPage = () => {

    const BadgeItem = ({title, description, icon, progress}) => {

        return (
            <div className="p-6 border border-border rounded-lg shadow-lg flex flex-col gap-4 items-center min-w-56 h-80 flex-1">
                <div className="w-36 h-36 text-[50px] bg-gray-100 rounded-full flex items-center justify-center">
                    {icon}
                </div>
                <div className="flex flex-col gap-2 text-center">
                    <h4 className="font-semibold text-lg">{title}</h4>
                    <p className="text-md">{description}</p>
                </div>
                <div className="flex items-center gap-2 w-full">
                    <div className="flex flex-col gap-4 items-center justify-center w-full">
                        <Progress value={progress}/>
                        <div className="text-md text-gray-900 font-semibold">{progress}%</div>
                    </div>

                </div>
            </div>
        )
    }

    const badges = [
        {
            title: 'Beginner',
            description: 'You have answered 1 question',
            icon: '🎓',
            progress: 100
        },
        {
            title: 'Intermediate',
            description: 'You have answered 5 questions',
            icon: '🏆',
            progress: 90
        },
        {
            title: 'Advanced',
            description: 'You have answered 15 questions',
            icon: '🚀',
            progress: 50
        },
        {
            title: 'Expert',
            description: 'You have answered 30 questions',
            icon: '🔥',
            progress: 15
        }
    ]



    return (
        <div className="p-4 flex gap-4 flex-col">
            <h1>Badges</h1>
            <div className="flex justify-center w-full flex-col items-center">

                <div className="w-full flex">
                    <div className="flex flex-row gap-4 w-full flex-wrap h-full">
                        {
                            badges.map((badge) => (
                                <BadgeItem {...badge}/>
                            ))
                        }
                    </div>
                </div>
            </div>

        </div>
    )
}

export default BadgesPage;