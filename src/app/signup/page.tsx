"use client";

import Loading from "@/components/Loading";
import returnType from "@/types/returntype";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';


export default function SignUp() {
    const router = useRouter();
    const [user, setUser] = useState({
        username: "",
        password: "",
        cpasswaord: "",
    });

    const [check, setCheck] = useState(true);
    const [isLoad, setIsLoad] = useState(false);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        try {
            setIsLoad(!isLoad);

            const responseFromServer = await fetch('/api/signup', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user)
            }).then((res) => {
                return res.json();
            }).then((jsonData) => {
                return jsonData;
            }) as returnType;

            if (responseFromServer.success) {
                //reload will tigger authentication()
                setIsLoad(!isLoad);

                router.push('/login');
            }
            else {
                toast.error(responseFromServer.message);
                setIsLoad(!isLoad);

            }
        } catch (error) {
            setIsLoad(!isLoad);

            toast.error("Unable to connect to server");
        }

    }


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
            {isLoad ? (<Loading />) : (<></>)}

            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-700 to-purple-300">
                <div className="bg-white p-8 shadow-md rounded-md max-w-md w-full">
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-2">
                            Enter email Id
                        </label>
                        <input
                            required
                            type="email"
                            name="email"
                            id="email"
                            placeholder="email"
                            className="p-2 w-full mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-purple-400"
                            value={user.username}
                            onChange={(e) => setUser({ ...user, username: e.target.value })}
                        />

                        <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-2">
                            Enter password
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
                            Confirm password
                        </label>
                        <input
                            required
                            type="password"
                            name="password"
                            id="password"
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
                            Submit
                        </button>
                    </form>

                    <p className="mt-4 text-center">
                        Have an account? {' '}
                        <Link className="text-purple-400 hover:underline" href="/login">
                            Login

                        </Link>
                    </p>
                </div>
            </div >
        </>
    );
}