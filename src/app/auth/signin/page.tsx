"use client";
import { useEffect } from "react";
import { FaGoogle } from "react-icons/fa";
import { redirect } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
const SignInPage = () => {
    const { status } = useSession();
    useEffect(() => {
        if (status === "authenticated") redirect("/");
    }, [status]);
    if (status === "loading" || status === "authenticated") return <div>Loading...</div>;
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-center">
                <h1 className="text-2xl font-bold mb-4">Sign In</h1>
                <p className="text-gray-400 mb-8">Sign in with your Google account to continue.</p>
                <button
                    onClick={() => signIn("google", { callbackUrl: "/" })}
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center w-full"
                >
                    <FaGoogle className="mr-2" />
                    Sign in with Google
                </button>
            </div>
        </div>
    );
};
export default SignInPage;
