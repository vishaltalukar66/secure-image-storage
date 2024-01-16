"use client";

import UploadImages from "@/components/UploadImages";
import ViewImages from "@/components/ViewImages";
import returnType from "@/types/returntype";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";


// Define the interface for the data received from the server
interface dataInterface {
    message: {
        id: string;
        username: string;
        iat: number;
        exp: number;
    };
    success: boolean;
}

export default function ProfilePage() {

    const [displayImage, setDisplayImage] = useState(false);
    const [displayUpload, setDisplayUpload] = useState(false);
    const router = useRouter();

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
    // Toggle the display of images

    function handleViewImages() {
        setDisplayImage(!displayImage);
        setDisplayUpload(false);


    }
    // Toggle the display of upload

    function handleViewUpload() {
        setDisplayUpload(!displayUpload);
        setDisplayImage(false);

    }
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

    // Fetch user data from the server on component mount
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
                        <div>
                            <button
                                onClick={handleViewImages}
                                className="mt-4 bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-yellow-300 focus:outline-none focus:ring focus:border-blue-300"
                            >
                                View Images
                            </button>

                            <button
                                onClick={handleViewUpload}
                                className="md:ml-3 mt-4 bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-yellow-300 focus:outline-none focus:ring focus:border-blue-300"
                            >
                                Upload Images
                            </button>
                        </div>
                        {/* Conditionally render ViewImages component if displayImage is true, otherwise render an empty fragment */}
                        {displayImage ? (<ViewImages username={`${data.message.username}`} />) : (<></>)}

                        {/* Conditionally render UploadImages component if displayUpload is true, otherwise render an empty fragment */}
                        {displayUpload ? (<UploadImages username={`${data.message.username}`} />) : (<></>)}


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