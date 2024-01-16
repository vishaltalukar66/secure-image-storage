import returnType from "@/types/returntype";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Loading from "./Loading";

export default function ViewImages({ username }: { username: string }) {

    interface ImageData {
        key: string;
        keyUrl: string;
        id: string;
    }
    const [isLoad, setIsLoad] = useState(false);


    const [imgData, setImgData] = useState<ImageData[]>([]);


    useEffect(() => {
        const fetchData = async () => {
            setIsLoad(true);
            const responseFromServer = await fetch('/api/get-all-images', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username: username })

            }).then((res) => {
                return res.json();
            }).then((jsonData) => {
                return jsonData;
            }) as { message: string; success: boolean; data: ImageData };
            // console.log(responseFromServer);
            if (responseFromServer.success) {
                setImgData(responseFromServer.data as unknown as ImageData[]);
                toast.success('Got Data');
                setIsLoad(false);

            }
            else {
                toast.error('unable to get Data');

                setIsLoad(false);
            }
        };
        fetchData();
    }, [username]);

    return (
        <>
            <Toaster />
            <div className="mt-8">
                {isLoad ? (<Loading />) : (<></>)}

                <h1 className="text-3xl font-bold mb-4">View Images</h1>
                <div className="bg-white text-black text-xl p-6 rounded-lg shadow-md">

                    <div className="mt-4">
                        <p className="font-semibold text-center">View all images:</p>
                        <div className="relative overflow-x-auto">
                            <table className="table-auto w-full">
                                <thead>
                                    <tr>
                                        <th className="text-center bg-gray-800 text-white py-2">Image-key</th>
                                    </tr>
                                </thead>
                                <tbody className="text-black text-lg">
                                    {/* Iterate through fetched image data and render each row */}
                                    {imgData.map((imageData, index) => (
                                        <tr key={imageData.id} className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'} border-b border-gray-400 `}>
                                            <td className="text-center px-4 py-2">
                                                <Link className="text-blue-500 hover:underline" href={imageData.keyUrl}>

                                                    {imageData.key}
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>


                </div>
            </div>
        </>
    );
}