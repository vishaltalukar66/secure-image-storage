"use client";
import returnType from '@/types/returntype';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const VerifyEmailPage = () => {
    const [token, setToken] = useState("");
    const router = useRouter();
    async function handleSubmit() {

        try {
            const responseFromServer = await fetch('/api/verify', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ token: token })
            }).then((res) => {
                return res.json();
            }).then((jsonData) => {
                return jsonData;
            }) as returnType;

            if (responseFromServer.success) {
                //reload will tigger authentication()
                router.push('/login');
            }
            else {
                toast.error(responseFromServer.message);
            }
        } catch (error) {
            // console.log(error);
            toast.error("Unable to connect to server");
        }
    }
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token') as string;
        setToken(token);

    }, []);


    return (
        <>
            <Toaster />

            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-700 to-purple-300">
                <div className="bg-white p-8 shadow-md rounded-md max-w-md w-full">
                    <h1 className="text-4xl font-bold mb-4">Email Verification</h1>
                    <button
                        className="p-2 w-full text-2xl border-4 bg-purple-400 text-white rounded-md"
                        onClick={handleSubmit}

                    >
                        Verify Email
                    </button>

                </div>
            </div>
        </>
    );
};

export default VerifyEmailPage;
