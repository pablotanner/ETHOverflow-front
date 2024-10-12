import { Button } from "../components/button/button.tsx";
import { RotateCw, User, Mail, Calendar, Star, MessageSquare, ThumbsUp } from "lucide-react";
import { useGetQuestionsQuery } from "../services/api/questionApi.js";
import React from "react";
import {useGetUserActivityQuery} from "../services/api/authApi.js";
import {GlareCard} from "../components/card/glare-card.jsx";

const AboutPage = () => {
    const {
        data: user,
        isLoading,
        isError: isUserError
    } = useGetUserActivityQuery()


    if (isLoading) {
        return (
            <div className="p-4 flex flex-col items-center justify-center h-full">
                <RotateCw className="animate-spin h-6 w-6 text-gray-500" />
                <p className="text-gray-500 mt-2">Loading account information...</p>
            </div>
        );
    }

    if (isUserError) {
        return (
            <div className="p-4 flex flex-col items-center justify-center h-full">
                <p className="text-red-500">There was an error loading your account information.</p>
            </div>
        );
    }

    return (
        <div className="mx-auto p-6 ">
            <GlareCard className="p-4">
                <h1 className="text-2xl font-semibold text-white text-center">Account Information</h1>
                <div className="space-y-2">
                    <div className="flex items-center text-white space-x-2">
                        <User className="h-5 w-5 text-white"/>
                        <span className="font-medium">Username:</span>
                        <span className="text-white">{user?.display_name}</span>
                    </div>
                    <div className="flex items-center text-white space-x-2">
                        <Mail className="h-5 w-5 text-white"/>
                        <span className="font-medium">Email:</span>
                        <span className="text-white">{user.email}</span>
                    </div>
                    <div className="flex items-center text-white space-x-2">
                        <Calendar className="h-5 w-5 text-white"/>
                        <span className="font-medium">Date Joined:</span>
                        <span className="text-white">{user.date_joined}</span>
                    </div>
                    <div className="flex items-center text-white space-x-2">
                        <Star className="h-5 w-5 text-yellow-500"/>
                        <span className="font-medium">Reputation:</span>
                        <span className="text-white">{user.reputation}</span>
                    </div>
                    <div className="flex items-center text-white space-x-2">
                        <MessageSquare className="h-5 w-5 text-white"/>
                        <span className="font-medium">Total Questions:</span>
                        <span className="text-white">{user?.questions?.length}</span>
                    </div>
                    <div className="flex items-center  text-white space-x-2">
                        <MessageSquare className="h-5 w-5 text-white"/>
                        <span className="font-medium">Total Answers:</span>
                        <span className="text-white">{user?.answers?.length}</span>
                    </div>
                    <div className="flex items-center text-white space-x-2">
                        <MessageSquare className="h-5 w-5 text-white"/>
                        <span className="font-medium">Total Comments:</span>
                        <span className="text-white">{user?.comments?.length}</span>
                    </div>
                    <div className="flex items-center text-white space-x-2">
                        <ThumbsUp className="h-5 w-5 text-white"/>
                        <span className="font-medium">Total Votes:</span>
                        <span className="text-white">{user?.votes?.length}</span>
                    </div>
                </div>


            </GlareCard>
        </div>


    );
};

export default AboutPage;
