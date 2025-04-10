import { app } from "./app.js";
import envConfig from "./config/env.config.js";
import { database } from "./db/db.js";
import logger from "./util/globalUtil/logger.util.js";

async function StartServer() {
  await database
    .connect()
    .then(() => {
      app.listen(envConfig.PORT, () => {
        logger.info(`✅ Database connected successfully \n  Server is running on http://localhost:${envConfig.PORT}`);
      });
    })
    .catch((err: unknown) => {
      logger.error("ERRR:: Unable to connection with database", { err });
    });
}

await StartServer();
