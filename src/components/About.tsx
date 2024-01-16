export default function About() {
    return (
        <>

            <div className="container mx-auto mt-10 p-4">
                <div className=" bg-white text-black text-xl p-6 rounded-lg shadow-md 
                w-4/4 mx-auto md:w-3/4">
                    <div className="py-8">
                        <h1 className="text-3xl font-bold mb-4">Project Overview</h1>

                        <p className="mb-6">
                            This project enables users to securely store and manage images by leveraging the power of Amazon S3 (Simple Storage Service). It incorporates user authentication to ensure data privacy and employs signed URLs for controlled access to images.
                        </p>

                        <h2 className="text-xl font-semibold mb-4">Key Features</h2>

                        <div className="mb-4">
                            <h3 className="text-lg font-semibold mb-2">1. User Authentication:</h3>
                            <ul className="list-disc pl-6">
                                <li>Users are required to log in to access the image storage functionality.</li>
                                <li>Secure authentication ensures that only authorized users can manage their images.</li>
                            </ul>
                        </div>

                        <div className="mb-4">
                            <h3 className="text-lg font-semibold mb-2">2. Image Storage in S3 Bucket:</h3>
                            <ul className="list-disc pl-6">
                                <li>Images are stored in an Amazon S3 bucket, a scalable and secure cloud storage service.</li>
                                <li>This allows for efficient management and retrieval of user-uploaded images.</li>
                            </ul>
                        </div>

                        <div className="mb-4">
                            <h3 className="text-lg font-semibold mb-2">3. Signed URLs for Secure Image Access:</h3>
                            <ul className="list-disc pl-6">
                                <li>The project utilizes signed URLs for controlled access to images.</li>
                                <li>Signed URLs provide a time-limited and secure way for authenticated users to view their images.</li>
                            </ul>
                        </div>

                        <div className="mb-4">
                            <h3 className="text-lg font-semibold mb-2">4. Next.js and AWS SDK Integration:</h3>
                            <ul className="list-disc pl-6">
                                <li>The application is built using Next.js, a React framework for server-rendered applications.</li>
                                <li>The AWS SDK is integrated to interact with Amazon S3 and generate signed URLs.</li>
                            </ul>
                        </div>

                        <h2 className="text-xl font-semibold mb-4">Usage Instructions</h2>

                        <div className="mb-4">
                            <h3 className="text-lg font-semibold mb-2">1. Log In:</h3>
                            <p>Users need to log in to access the image storage features.</p>
                        </div>

                        <div className="mb-4">
                            <h3 className="text-lg font-semibold mb-2">2. Upload Images:</h3>
                            <p>Once authenticated, users can upload images to the S3 bucket.</p>
                        </div>

                        <div className="mb-4">
                            <h3 className="text-lg font-semibold mb-2">3. View Images:</h3>
                            <ul className="list-disc pl-6">
                                <li>Users can view their images securely using the provided interface.</li>
                                <li>The application uses signed URLs to grant temporary access to the images.</li>
                            </ul>
                        </div>

                        <h2 className="text-xl font-semibold mb-4">Security Considerations</h2>

                        <ul className="list-disc pl-6 mb-4">
                            <li>AWS credentials are securely managed, and access is controlled to ensure data security.</li>
                            <li>The use of signed URLs adds an extra layer of security by restricting access to authorized users and a specified time window.</li>
                        </ul>

                        <p className="mb-6">
                            Note: For production use, additional security measures, such as encryption and secure key management, should be implemented.
                        </p>

                        <p>
                            This project showcases a secure and scalable solution for image storage using Amazon S3, combined with user authentication for a personalized and protected user experience.
                        </p>
                    </div>


                </div>
            </div>

        </>
    );
}