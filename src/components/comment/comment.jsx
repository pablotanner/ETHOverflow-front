import {HoverCard, HoverCardContent, HoverCardTrigger} from "../card/hover-card.tsx";
import {Avatar, AvatarFallback} from "../avatar/avatar.tsx";
import {CalendarDays} from "lucide-react";


const Comment = ({ comment }) => {

    const formatDate = (date) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString(undefined, options);
    }

    return (
        <div className="text-xs inline-flex float-left m-0 gap-1">
            <p className="text-gray-500">
                <HoverCard>
                    <HoverCardTrigger asChild>
                        <p className="text-gray-500 text-xs cursor-pointer">{comment?.created_by}:</p>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-60">
                        <div className="flex justify-between space-x-4">
                            <Avatar>
                                <AvatarFallback>
                                    <p>{comment?.creator?.display_name[0] || "?"}</p>
                                </AvatarFallback>
                            </Avatar>
                            <div className="space-y-1">
                                <h4 className="text-sm font-semibold">{comment?.creator?.display_name}</h4>
                                <p className="text-sm">
                                    Reputation: {comment?.creator?.reputation}
                                </p>
                                <div className="flex items-center pt-2">
                                    <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
                                    <span className="text-xs text-muted-foreground">
                                        Joined on {formatDate(comment?.creator?.date_joined)}
                                </span>
                                </div>
                            </div>
                        </div>
                    </HoverCardContent>
                </HoverCard>
            </p>
            <p>{comment.content}</p>
        </div>
    );
}

export default Comment;