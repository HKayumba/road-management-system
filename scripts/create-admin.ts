import "dotenv/config";
import { db } from "../lib/db";
import { users } from "../lib/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

async function createAdmin() {
  try {
    console.log("Creating admin user...");

    const email = "admin@roadmaintenance.gov";
    const password = "admin123";

    // Check if admin already exists
    const [existingAdmin] = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (existingAdmin) {
      console.log("Admin user already exists!");
      console.log(`Email: ${email}`);
      console.log("Password: admin123");
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create admin user
    const [admin] = await db
      .insert(users)
      .values({
        name: "Admin User",
        email: email,
        password: hashedPassword,
        role: "Admin",
      })
      .returning();

    console.log("\n✅ Admin user created successfully!");
    console.log(`Email: ${admin.email}`);
    console.log(`Password: ${password}`);
    console.log("\n⚠️  Please change the password after first login!");
  } catch (error) {
    console.error("Error creating admin user:", error);
    throw error;
  }
}

createAdmin()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
