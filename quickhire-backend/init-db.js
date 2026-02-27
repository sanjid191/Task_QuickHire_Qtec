const { Client } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const client = new Client({
    connectionString: process.env.DATABASE_URL,
});

async function runMigration() {
    try {
        await client.connect();
        console.log('Connected to Supabase PostgreSQL');

        const schemaPath = path.join(__dirname, '..', 'supabase_schema.sql');
        const schemaSql = fs.readFileSync(schemaPath, 'utf8');

        console.log('Running schema update...');
        await client.query(schemaSql);

        console.log('Schema successfully applied to Supabase database!');
    } catch (err) {
        console.error('Error applying schema:', err);
    } finally {
        await client.end();
    }
}

runMigration();
