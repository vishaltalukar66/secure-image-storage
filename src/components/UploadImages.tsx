import getUploadUrl from "@/utils/getUploadUrl";
import React, { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import Loading from "./Loading";

export default function UploadImages({ username }: { username: string }) {

    const [file, setFile] = useState<File>();
    const [imageName, setImageName] = useState("");
    const [isLoad, setIsLoad] = useState(false);


    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {

        event.preventDefault();
        if (!file) return;
        try {
            setIsLoad(true);
            const data = new FormData();
            data.set('file', file);
            const res = await getUploadUrl(username) as {
                message: string;
                success: boolean;
                fileName?: string;
                url?: string;
            };
            if (res.success) {
                toast(`${res.message}`);
                toast(`uploading..... ${res.fileName}`);
                const response = await fetch(res.url!, {
                    method: "PUT",
                    body: file
                }).then(response => { return response.status; })
                    .catch(error => console.log('error', error));
                if (response === 200) {
                    // tost success, then copy image name 
                    toast.success('Successfully uploaded image!');
                    setIsLoad(false);

                }
                else {
                    setIsLoad(false);

                    toast.error('Unable to uploaded image!');

                }
            }
            else {
                setIsLoad(false);

                toast.error('Unable to generate URL!');

            }

        } catch (error) {
            // console.log(error);
            toast.error('contact admin some error');
            setIsLoad(false);

        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        setFile(selectedFile);
        setImageName(selectedFile!.name);
    };
    return (
        <>
            <Toaster />
            <div className="mt-8">
                {isLoad ? (<Loading />) : (<></>)}
                <h1 className="text-3xl font-bold mb-4">Upload Images</h1>
                <div className="bg-white text-black text-xl p-6 rounded-lg shadow-md">

                    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
                        <label htmlFor="file" className="block text-xl mb-4">Choose an image:</label>
                        <input
                            type="file"
                            accept="image/jpeg"
                            name="file"
                            id="file"
                            className="w-full mb-4 p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            onChange={handleFileChange}
                        />
                        {imageName && (
                            <p className="text-gray-600 mb-4">Selected file: {imageName}</p>
                        )}

                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300"
                        >
                            Submit
                        </button>

                    </form>
                </div>
            </div>
        </>
    );
}