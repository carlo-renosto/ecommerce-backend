
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
    },
    jwt: {
        private_key: process.env.JWT_PRIVATE_KEY
    },
    error: {
        database: process.env.DATABASE_ERROR,
        auth: process.env.AUTH_ERROR,
        invalid_body: process.env.INVALID_BODY_JSON,
        invalid_param: process.env.INVALID_PARAM,
        invalid_id: process.env.INVALID_ID
    }
}