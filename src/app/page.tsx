import mongo from "../assets/mongo.png";
import next from "../assets/next.png";

import Link from 'next/link';
import Image from "next/image";
import About from "@/components/About";

export default function Home() {
  return (
    <>


      <div className="min-h-screen grid items-center justify-center bg-gradient-to-br from-blue-700 to-purple-300 text-white">

        <div className="container mx-auto mt-10 p-4">
          <div className=" bg-white text-black text-xl p-6 rounded-lg shadow-md 
                w-4/4 mx-auto md:w-3/4">
            <div className="py-8">
              <div className="text-center">
                <h1 className="text-4xl font-bold mb-6">The project is built for learning purpose.</h1>
                <p className="text-lg mb-8">Built using Next.js, MongoDB and AWS</p>

                <div className="mb-8">
                  <button className="m-4 bg-red-500 text-2xl text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-blue-300">
                    <Link href="/login">
                      Login
                    </Link>
                  </button>

                  <button className="m-4 bg-red-500 text-2xl text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-blue-300">
                    <Link href="/signup" >
                      Signup
                    </Link>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <About />

      </div >

    </>
  );
}
