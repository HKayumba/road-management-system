import "dotenv/config";
import { db } from "../lib/db";
import { users } from "../lib/db/schema";
import bcrypt from "bcryptjs";

async function seed() {
  try {
    console.log("Seeding database...");

    // Create admin user
    const adminPassword = await bcrypt.hash("admin123", 10);
    const [admin] = await db
      .insert(users)
      .values({
        name: "Admin User",
        email: "admin@roadmaintenance.gov",
        password: adminPassword,
        role: "Admin",
      })
      .returning();

    console.log("Created admin user:", admin.email);

    // Create field worker user
    const workerPassword = await bcrypt.hash("worker123", 10);
    const [worker] = await db
      .insert(users)
      .values({
        name: "Field Worker",
        email: "worker@roadmaintenance.gov",
        password: workerPassword,
        role: "FieldOfficer",
      })
      .returning();

    console.log("Created field worker user:", worker.email);

    console.log("\nDefault credentials:");
    console.log("Admin: admin@roadmaintenance.gov / admin123");
    console.log("Field Worker: worker@roadmaintenance.gov / worker123");
    console.log("\nSeeding completed successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  }
}

seed()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
