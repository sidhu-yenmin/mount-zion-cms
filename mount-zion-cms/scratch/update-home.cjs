const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgres://postgres:Yenmin%40123@localhost:5432/mount-zion-cms',
});

async function main() {
  await pool.query(
    'UPDATE pages_blocks_programs SET heading = $1 WHERE _parent_id = 4',
    ["Shaping Bright Minds for Tomorrow's World!!"]
  );
  console.log('Successfully updated Home Page (ID 4) heading in database!');
  await pool.end();
}

main();
