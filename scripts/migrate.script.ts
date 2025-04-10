import { database } from "../src/db/db.js";
import logger from "../src/util/globalUtil/logger.util.js";
import { throwError } from "../src/util/globalUtil/throwError.util.js";
await database
  .runMigrations()
  .then(() => {
    logger.info("Migrations ran successfully");
    process.exit(0);
  })
  .catch((err) => {
    logger.error("Error running migrations", { error: err });
    if (err instanceof Error) throwError(500, err.message);
    throwError(500, "Something went wrong while migrating to the database");
  });
