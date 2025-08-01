import 'dotenv/config';
import postgres, { Sql } from 'postgres';
const resetAll = async (sql: Sql) => {
	console.log('Attempting to reset database...');
	await sql`DROP SCHEMA public CASCADE;`;
	await sql`CREATE SCHEMA public;`;
	console.log('✅ Database reset complete: All tables cleared.');
};
const resetTables = async (sql: Sql, tables: string[]) => {
	console.log(`Attempting to reset tables: ${tables.join(', ')}`);
	for (const table of tables) await sql.unsafe(`TRUNCATE TABLE "${table}" RESTART IDENTITY CASCADE`);
	console.log(`✅ Tables reset complete: ${tables.join(', ')}`);
};
async function main() {
	const command = process.argv[2];
	const databaseUrl = process.env.DATABASE_URL;
	if (!databaseUrl) {
		console.error('DATABASE_URL environment variable is not set.');
		process.exit(1);
	}
	const sql = postgres(databaseUrl, { ssl: { rejectUnauthorized: false }, max: 1 });
	try {
		switch (command) {
			case 'news':
				await resetTables(sql, ['articles', 'newsSources']);
				break;
			case 'blog':
				await resetTables(sql, ['generatedContents']);
				break;
			case undefined:
				await resetAll(sql);
				break;
			default:
				console.error(`Unknown command: ${command}`);
				process.exit(1);
		}
	} catch (error) {
		console.error('❌ Failed to execute reset command:', error);
		process.exit(1);
	} finally {
		await sql.end();
	}
}
main();
