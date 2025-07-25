
import postgres from 'postgres';
import 'dotenv/config';

async function main() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    console.error('DATABASE_URL environment variable is not set.');
    process.exit(1);
  }

  const sql = postgres(databaseUrl, {
    ssl: { rejectUnauthorized: false },
    max: 1, // Only need one connection for this operation
  });

  try {
    console.log('Attempting to reset database...');
    // Drop all tables by dropping and recreating the public schema
    await sql`DROP SCHEMA public CASCADE;`;
    await sql`CREATE SCHEMA public;`;
    console.log('✅ Database reset complete: All tables cleared.');
  } catch (error) {
    console.error('❌ Failed to reset database:', error);
    process.exit(1);
  } finally {
    await sql.end();
  }
}

main();
