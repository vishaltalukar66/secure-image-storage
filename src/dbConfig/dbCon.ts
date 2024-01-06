import mongoose from "mongoose";

export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URI as string);
        const connection = mongoose.connection;

        connection.on('connceted', () => {
            console.log("Successfully connected");
        });

        connection.on('error', (e) => {
            console.log("erro while connecting", e);

        });
    } catch (error) {
        console.log(error);
    }
}