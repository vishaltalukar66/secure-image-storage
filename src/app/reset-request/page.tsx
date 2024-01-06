"use client";

import returnType from "@/types/returntype";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function ResetPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');


  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const responseFromServer = await fetch('/api/reset-request', {
        method: 'POST',
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(email)
      }).then((res) => {
        return res.json();
      }).then((jsonData) => {
        return jsonData;
      }) as returnType;

      if (responseFromServer.success) {
        //reload will tigger authentication()
        toast.success(responseFromServer.message);
        setEmail('');
        // router.push('/');
      }
      else {
        toast.error(responseFromServer.message);
      }
    } catch (error) {
      toast.error("Unable to connect to server");
      setEmail('');
    }
  }

  return (
    <>
      <Toaster />

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-700 to-purple-300">
        <div className="bg-white p-8 shadow-md rounded-md max-w-md w-full">
          <form onSubmit={handleSubmit}>
            <h1 className="text-2xl font-bold mb-4">Password Reset</h1>
            <p className="mb-4">Enter your Email-id:</p>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 mb-4 border rounded border-black"
            />
            <button

              className="w-full p-2 bg-blue-500 text-white rounded"
            >
              Send Reset Link
            </button>
          </form>
        </div>


      </div >
    </>
  );
};