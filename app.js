import express from "express";
import cors from "cors";
import './src/config/db.config.js';
import logger from "./src/middlewares/logger.middleware.js";

const app = express();

app.use(logger)
app.use(cors({ origin: "*" }));
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    console.log("Incoming request body:-->", req.body);
    next();
});

import config from "./src/config/config.js";
import router from "./src/routes/index.route.js";

app.use("/api/v1", router)

if (process.env.NODE_ENV !== 'production') {
    app.listen(config.port, () => {
        console.log(`Server running on port ${config.port}`);
    });
}

export default app;
