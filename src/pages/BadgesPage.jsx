import {Avatar, AvatarFallback} from "../components/avatar/avatar.tsx";
import {Progress} from "../components/progress/progress.tsx";
import {CardBody, CardContainer, CardItem} from "../components/card/3d-card.jsx";
import {useGetUserActivityQuery} from "../services/api/authApi.js";
import {GlareCard} from "../components/card/glare-card.jsx";


const BadgesPage = () => {

    const {
        data: user,
        isLoading: isUserLoading,
        isError: isUserError
    } = useGetUserActivityQuery();


    if (isUserLoading) {
        return <div>Loading...</div>
    }


    const reputation = user?.reputation || 0;
    const total_answers = user?.total_answers || 0;




    const BadgeItem = ({title, description, icon, progress}) => {

        return (
            <GlareCard>
                    <div className="relative justify-center items-center text-center  rounded-xl p-6 border">
                        <div
                            className="text-xl font-bold text-white w-full"
                        >
                            {title}
                        </div>
                        <div
                            className="text-white text-sm max-w-sm mt-2 w-full"
                        >
                            {description}
                        </div>
                        <div

                            className="w-full mt-4 flex justify-center items-center"
                        >
                            <div
                                className="w-36 h-36 text-[50px] rounded-full flex items-center justify-center bg-white ">
                                {icon}
                            </div>
                        </div>
                        <div className="flex justify-between flex-col text-white items-center mt-6">
                            <div
                                className="px-4 py-2 rounded-xl text-xs font-normal w-full"
                            >
                                <Progress value={progress}/>
                            </div>
                            <div
                                className="px-3 py-2 rounded-xl border-2 text-white text-xs font-bold"
                            >
                                {progress}%
                            </div>
                        </div>
                    </div>
            </GlareCard>

        )

    }

    const calculateProgress = (total, required) => {
        let progress = (total / required) * 100;
        return progress > 100 ? 100 : progress;
    }

    const badges = [
        {
            title: 'Novice Answerer',
            description: 'You have answered 1 question',
            icon: '🎓',
            progress: calculateProgress(total_answers, 1)
        },
        {
            title: 'Intermediate Answerer',
            description: 'You have answered 5 questions',
            icon: '🏆',
            progress: calculateProgress(total_answers, 5)
        },
        {
            title: 'Advanced Answerer',
            description: 'You have answered 15 questions',
            icon: '🚀',
            progress: calculateProgress(total_answers, 15)
        },
        {
            title: 'Expert Answerer',
            description: 'You have answered 30 questions',
            icon: '🔥',
            progress: calculateProgress(total_answers, 30)
        },
        {
            title: 'Jobless Answerer',
            description: 'You have answered 50 questions',
            icon: '💩',
            progress: calculateProgress(total_answers, 50)
        },
        {
            title: 'Reputation Beginner',
            description: 'You have earned 10 Reputation',
            icon: '🌟',
            progress: calculateProgress(reputation, 10)
        },
        {
            title: 'Reputation Intermediate',
            description: 'You have earned 50 Reputation',
            icon: '💫',
            progress: calculateProgress(reputation, 50)
        },
        {
            title: 'Reputation Advanced',
            description: 'You have earned 100 Reputation',
            icon: '🌠',
            progress: calculateProgress(reputation, 100)
        },
        {
            title: 'Reputation Expert',
            description: 'You have earned 200 Reputation',
            icon: '🌌',
            progress: calculateProgress(reputation, 200)
        }
    ]

    badges.sort((a, b) => {
        if (a.progress === 100) return 1;
        if (b.progress === 100) return -1;
        return Math.abs(100 - a.progress) - Math.abs(100 - b.progress);
    });


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