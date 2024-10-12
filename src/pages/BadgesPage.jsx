import {Avatar, AvatarFallback} from "../components/avatar/avatar.tsx";
import {Progress} from "../components/progress/progress.tsx";
import {CardBody, CardContainer, CardItem} from "../components/card/3d-card.jsx";
import {useGetUserActivityQuery} from "../services/api/authApi.js";


const BadgesPage = () => {

    const {
        data: user,
        isLoading: isUserLoading,
        isError: isUserError
    } = useGetUserActivityQuery();


    if (isUserLoading) {
        return <div>Loading...</div>
    }


    if (isUserError) {
        return <div>Error</div>
    }


    console.log(user)


    const reputation = user?.reputation || 0;
    const total_answers = user?.total_answers || 0;


    const BadgeItem = ({title, description, icon, progress}) => {

        return (
            <CardContainer className="flex min-w-56 flex-1 h-56">
                <CardBody className="bg-white/90 relative backdrop-blur-xl group/card border-black/[0.1] justify-center items-center text-center  rounded-xl p-6 border">
                    <CardItem
                        translateZ="50"
                        className="text-xl font-bold text-neutral-600 w-full"
                    >
                        {title}
                    </CardItem>
                    <CardItem
                        as="p"
                        translateZ="60"
                        className="text-neutral-500 text-sm max-w-sm mt-2 w-full"
                    >
                        {description}
                    </CardItem>
                    <CardItem
                        translateZ="100"
                        rotateX={20}
                        rotateZ={-10}
                        className="w-full mt-4 flex justify-center items-center"
                    >
                        <div
                            className="w-36 h-36 text-[50px] rounded-full flex items-center justify-center bg-indigo-100/60 ">
                            {icon}
                        </div>
                    </CardItem>
                    <div className="flex justify-between flex-col items-center mt-6">
                        <CardItem

                            as="button"
                            className="px-4 py-2 rounded-xl text-xs font-normal w-full"
                        >
                            <Progress value={progress}/>
                        </CardItem>
                        <CardItem
                            as="button"
                            className="px-3 py-2 rounded-xl border-2 border-emerald-500 text-emerald-900 text-xs font-bold"
                        >
                            {progress}%
                        </CardItem>
                    </div>
                </CardBody>
            </CardContainer>
        )

    }

    const calculateProgress = (total, required) => {
        let progress = (total / required) * 100;
        return progress > 100 ? 100 : progress;
    }

    const badges = [
        {
            title: 'Beginner',
            description: 'You have answered 1 question',
            icon: '🎓',
            progress: calculateProgress(total_answers, 1)
        },
        {
            title: 'Intermediate',
            description: 'You have answered 5 questions',
            icon: '🏆',
            progress: calculateProgress(total_answers, 5)
        },
        {
            title: 'Advanced',
            description: 'You have answered 15 questions',
            icon: '🚀',
            progress: calculateProgress(total_answers, 15)
        },
        {
            title: 'Expert',
            description: 'You have answered 30 questions',
            icon: '🔥',
            progress: calculateProgress(total_answers, 30)
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