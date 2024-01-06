"use client";

import returnType from "@/types/returntype";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function ProfilePage() {
    const router = useRouter();
    interface dataInterface {
        message: {
            id: string;
            username: string;
            iat: number;
            exp: number;
        };
        success: boolean;
    }
    const [data, setData] = useState<dataInterface>({
        message: {
            id: "string",
            username: "string",
            iat: 5,
            exp: 5,
        },
        "success": true,
    },
    );
    async function handleLogout() {
        try {
            const responseFromServer = await fetch('/api/logout', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                },

            }).then((res) => {
                return res.json();
            }).then((jsonData) => {
                return jsonData;
            }) as returnType;

            if (responseFromServer.success) {
                //reload will tigger authentication()
                toast.success(responseFromServer.message);
                router.push('/');
            }
            else {
                toast.error(responseFromServer.message);
            }
        } catch (error) {

            toast.error("Unable to connect to server");
        }
    }
    useEffect(() => {
        const fetchData = async () => {
            const responseFromServer = await fetch('/api/decodeToken', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                },

            }).then((res) => {
                return res.json();
            }).then((jsonData) => {
                return jsonData;
            }) as returnType;
            if (responseFromServer.success) {
                setData(responseFromServer as unknown as dataInterface);
                toast.success('Got Data');
            }
        };
        fetchData();
    }, []);
    return (
        <>
            <Toaster />
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-700 to-purple-300 text-white">
                <div className="container mx-auto mt-10 p-4 ">
                    <h1 className="text-3xl font-bold mb-4">Profile Page</h1>
                    <div className="bg-white text-black text-xl p-6 rounded-lg shadow-md">
                        <p className="text-lg">
                            <span className="font-semibold">User Name:</span> {data.message.username}
                        </p>
                        <p className="text-lg">
                            <span className="font-semibold">User ID:</span> {data.message.id}
                        </p>
                        <button
                            onClick={handleLogout}
                            className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-blue-300"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}