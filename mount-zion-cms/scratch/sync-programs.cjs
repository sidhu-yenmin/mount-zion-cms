const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgres://postgres:Yenmin%40123@localhost:5432/mount-zion-cms',
});

async function main() {
  try {
    const existing = await pool.query('SELECT * FROM pages_blocks_programs WHERE _parent_id = 4');
    if (existing.rows.length > 0) {
      console.log('Programs block already on Home Page');
    } else {
      const prog = await pool.query('SELECT * FROM pages_blocks_programs WHERE _parent_id = 6');
      if (prog.rows.length > 0) {
        const row = prog.rows[0];
        const newId = '6aad204af5c2fcf6f2877b01';
        await pool.query(
          `INSERT INTO pages_blocks_programs (
            _order, _parent_id, _path, id, badge, heading, description,
            button_text, button_url, image_one_id, image_two_id,
            banner_text
          ) VALUES (
            $1, $2, $3, $4, $5, $6, $7,
            $8, $9, $10, $11,
            $12
          )`,
          [
            3, 4, 'layout', newId, row.badge, row.heading, row.description,
            row.button_text, row.button_url, row.image_one_id, row.image_two_id,
            row.banner_text
          ]
        );
        console.log('Successfully added Programs block to Home page (ID 4)!');
      }
    }
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await pool.end();
  }
}

main();
