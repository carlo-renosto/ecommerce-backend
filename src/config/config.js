
import dotenv from "dotenv";
dotenv.config();

export const config = {
    server: {
        secret_session: process.env.SECRET_SESSION
    },
    mongo: {
        url: process.env.MONGO_URL
    },
    github: {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        callback_url: process.env.GITHUB_CALLBACK_URL
    }
}