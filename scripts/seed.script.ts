import { runSeeding } from "../src/db/schemas/seed";
import logger from "../src/util/globalUtil/logger.util";
void (async function () {
  try {
    await runSeeding();
    console.info("Seeding completed successfully ✅");
    process.exit(0);
  } catch (error) {
    logger.error("Error running seed", { error });
    process.exit(1);
  }
})();
