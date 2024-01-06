"use client";

import returnType from "@/types/returntype";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";


export default function ResetPassword() {

    const router = useRouter();
    const [user, setUser] = useState({
        password: "",
        cpasswaord: "",
    });
    const [token, setToken] = useState("");
    const [check, setCheck] = useState(true);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        try {
            const responseFromServer = await fetch('/api/reset', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ password: user.password, token: token })
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
            console.log(error);
            toast.error("Unable to connect to server");
        }
    }

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token') as string;
        setToken(token);

    }, []);


    useEffect(() => {
        if (user.password === user.cpasswaord) {
            setCheck(false);
        }
        else {
            setCheck(true);

        }
    }, [user]);

    return (
        <>
            <Toaster />

            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-700 to-purple-300">
                <div className="bg-white p-8 shadow-md rounded-md max-w-md w-full">
                    <form onSubmit={handleSubmit}>


                        <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-2">
                            Enter new password
                        </label>
                        <input
                            required
                            type="password"
                            name="password"
                            id="password"
                            placeholder="password"
                            className="p-2 w-full mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-purple-400"
                            value={user.password}
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                        />


                        <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-2">
                            Confirm new password
                        </label>
                        <input
                            required
                            type="password"
                            name="password"
                            id="cpassword"
                            placeholder="confirm password"
                            className="p-2 w-full mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-purple-400"
                            value={user.cpasswaord}
                            onChange={(e) => setUser({ ...user, cpasswaord: e.target.value })}
                        />

                        <button
                            className="p-2 w-full text-2xl border-4 bg-purple-400 text-white rounded-md"
                            // onClick={handleSubmit}
                            disabled={check}
                        >
                            Reset password
                        </button>
                    </form>


                </div>
            </div >
        </>
    );
}