const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgres://postgres:Yenmin%40123@localhost:5432/mount-zion-cms',
});

async function main() {
  await pool.query('DELETE FROM pages_blocks_about_us WHERE _parent_id = 4');
  await pool.query('DELETE FROM pages_blocks_programs WHERE _parent_id = 4');
  console.log('Cleaned up duplicate blocks from home page (ID 4)');
  await pool.end();
}

main();
