import { runMigrations } from "../src/db/db.js";
import logger from "../src/util/appUtil/logger.util.js";
import { throwError } from "../src/util/appUtil/throwError.util.js";
await runMigrations()
  .then(() => {
    logger.info("Migrations ran successfully");
    process.exit(0);
  })
  .catch((err) => {
    logger.error("Error running migrations", { error: err });
    if (err instanceof Error) throwError(500, err.message);
    throwError(500, "Something went wrong while migrating to the database");
  });
