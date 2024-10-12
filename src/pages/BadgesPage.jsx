import {Avatar, AvatarFallback} from "../components/avatar/avatar.tsx";


const BadgesPage = () => {

    const BadgeItem = ({title, description, icon, progress}) => {

        return (
            <div className="p-4 border border-border rounded-lg shadow-lg flex flex-row gap-4 items-center">
                <div className="flex flex-col gap-2">
                    <h4 className="font-semibold text-lg">{title}</h4>
                    <p className="text-md">{description}</p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="flex flex-col gap-1">
                        <div className="text-sm">Progress</div>
                        <div className="text-lg font-semibold">{progress}%</div>
                    </div>
                    <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                        {icon}
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
            progress: 25
        },
        {
            title: 'Intermediate',
            description: 'You have answered 5 questions',
            icon: '🏆',
            progress: 50
        },
        {
            title: 'Advanced',
            description: 'You have answered 15 questions',
            icon: '🚀',
            progress: 75
        },
        {
            title: 'Expert',
            description: 'You have answered 30 questions',
            icon: '🔥',
            progress: 100
        }
    ]



    return (
        <div className="p-4 flex gap-4 flex-col">
            <h1>Badges</h1>
            <div className="flex justify-center w-full flex-col items-center">

                <div className="w-full flex">
                    <div className="flex flex-col gap-4 w-full">
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