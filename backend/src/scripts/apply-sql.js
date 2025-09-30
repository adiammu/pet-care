import fs from 'fs';
import path from 'path';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

async function main() {
  const filePath = process.argv[2];
  if (!filePath) {
    console.error('Usage: node src/scripts/apply-sql.js <sql-file>');
    process.exit(1);
  }
  const sqlPath = path.resolve(process.cwd(), filePath);
  const sql = fs.readFileSync(sqlPath, 'utf8');

  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    multipleStatements: true
  });

  try {
    await connection.query(sql);
    console.log('Applied SQL:', filePath);
  } finally {
    await connection.end();
  }
}

main().catch((err) => {
  console.error('Error applying SQL:', err);
  process.exit(1);
});



