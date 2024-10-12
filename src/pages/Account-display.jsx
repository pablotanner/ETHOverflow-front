import { Button } from "../components/button/button.tsx";
import { RotateCw, User, Mail, Calendar, Star, MessageSquare, ThumbsUp } from "lucide-react";
import { useGetQuestionsQuery } from "../services/api/questionApi.js";
import React from "react";

const AboutPage = () => {
    const {
        data: user,
        isLoading,
        isError: isQuestionsError
    } = useGetQuestionsQuery();

    if (isLoading) {
        return (
            <div className="p-4 flex flex-col items-center justify-center h-full">
                <RotateCw className="animate-spin h-6 w-6 text-gray-500" />
                <p className="text-gray-500 mt-2">Loading account information...</p>
            </div>
        );
    }

    if (isQuestionsError) {
        return (
            <div className="p-4 flex flex-col items-center justify-center h-full">
                <p className="text-red-500">There was an error loading your account information.</p>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
            <h1 className="text-2xl font-semibold text-gray-800 text-center">Account Information</h1>
            <div className="space-y-2">
                <div className="flex items-center space-x-2">
                    <User className="h-5 w-5 text-gray-600" />
                    <span className="font-medium">Username:</span>
                    <span className="text-gray-700">{user.username}</span>
                </div>
                <div className="flex items-center space-x-2">
                    <Mail className="h-5 w-5 text-gray-600" />
                    <span className="font-medium">Email:</span>
                    <span className="text-gray-700">{user.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-gray-600" />
                    <span className="font-medium">Date Joined:</span>
                    <span className="text-gray-700">{user.date_joined}</span>
                </div>
                <div className="flex items-center space-x-2">
                    <Star className="h-5 w-5 text-yellow-500" />
                    <span className="font-medium">Reputation:</span>
                    <span className="text-gray-700">{user.reputation}</span>
                </div>
                <div className="flex items-center space-x-2">
                    <MessageSquare className="h-5 w-5 text-gray-600" />
                    <span className="font-medium">Total Questions:</span>
                    <span className="text-gray-700">{user.total_questions}</span>
                </div>
                <div className="flex items-center space-x-2">
                    <MessageSquare className="h-5 w-5 text-gray-600" />
                    <span className="font-medium">Total Answers:</span>
                    <span className="text-gray-700">{user.total_answers}</span>
                </div>
                <div className="flex items-center space-x-2">
                    <MessageSquare className="h-5 w-5 text-gray-600" />
                    <span className="font-medium">Total Comments:</span>
                    <span className="text-gray-700">{user.total_comments}</span>
                </div>
                <div className="flex items-center space-x-2">
                    <ThumbsUp className="h-5 w-5 text-green-500" />
                    <span className="font-medium">Total Votes:</span>
                    <span className="text-gray-700">{user.total_votes}</span>
                </div>
            </div>
            <div className="flex justify-center mt-4">
                <Button label="Edit Profile" />
            </div>
        </div>
    );
};

export default AboutPage;
