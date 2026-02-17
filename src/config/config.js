import dotenv from "dotenv";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
    port: 3001,
    database: {
        url: "mongodb://127.0.0.1:27017/expenseapp",
    },
    bcrypt: {
        salt: 10,
    },
};
