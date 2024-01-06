import mongo from "../assets/mongo.png";
import next from "../assets/next.png";

import Link from 'next/link';
import Image from "next/image";

export default function Home() {
  return (
    <>


      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-700 to-purple-300 text-white">


        <div className="text-center">
          <h1 className="text-4xl font-bold mb-6">Welcome to Basic Authentication</h1>
          <p className="text-lg mb-8">Built using Next.js and MongoDB</p>

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

          <div className="flex justify-center">
            {/* Display tech stack logos */}
            <Image src={mongo} alt="mongo" className="w-40 h-12 mr-4" />
            <Image src={next} alt="next" className="w-40 h-12" />
          </div>
        </div >
      </div >

    </>
  );
}
