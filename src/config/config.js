import dotenv from "dotenv";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
    port: process.env.PORT,
    database: {
        url: process.env.DB_URL,
    },
    bcrypt: {
        salt: 10,
    },
};
