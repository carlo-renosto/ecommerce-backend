
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
    gmail: {
        account: process.env.GMAIL_ACCOUNT,
        password: process.env.GMAIL_PASSWORD,
        secretToken: process.env.GMAIL_TOKEN
    },
    jwt: {
        private_key: process.env.JWT_PRIVATE_KEY
    },
    error: {
        database: process.env.DATABASE_ERROR,
        auth: process.env.AUTH_ERROR,
        invalid_body: process.env.INVALID_BODY_JSON,
        invalid_param: process.env.INVALID_PARAM,
        invalid_id: process.env.INVALID_ID,
        invalid_code: process.env.INVALID_CODE,
        duplicated_id: process.env.DUPLICATED_ID,
        duplicated_code: process.env.DUPLICATED_CODE,
        duplicated_email: process.env.DUPLICATED_EMAIL
    }
}