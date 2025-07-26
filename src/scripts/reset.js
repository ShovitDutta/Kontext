import postgres from "postgres";
import "dotenv/config";
async function main() {
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
        console.error("DATABASE_URL environment variable is not set.");
        process.exit(1);
    }
    const sql = postgres(databaseUrl, { ssl: { rejectUnauthorized: false }, max: 1 });
    try {
        console.log("Attempting to reset database...");
        await sql`DROP SCHEMA public CASCADE;`;
        await sql`CREATE SCHEMA public;`;
        console.log("✅ Database reset complete: All tables cleared.");
    } catch (error) {
        console.error("❌ Failed to reset database:", error);
        process.exit(1);
    } finally {
        await sql.end();
    }
}
main();
