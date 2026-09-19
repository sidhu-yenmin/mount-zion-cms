const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgres://postgres:Yenmin%40123@localhost:5432/mount-zion-cms',
});

async function main() {
  try {
    const existing = await pool.query('SELECT * FROM pages_blocks_about_us WHERE _parent_id = 4');
    if (existing.rows.length > 0) {
      console.log('AboutUs block already on Home Page');
    } else {
      const about = await pool.query('SELECT * FROM pages_blocks_about_us WHERE _parent_id = 5');
      if (about.rows.length > 0) {
        const row = about.rows[0];
        const newId = '6aad104af5c2fcf6f2877a99';
        await pool.query(
          `INSERT INTO pages_blocks_about_us (
            _order, _parent_id, _path, id, badge, heading, description,
            button_text, button_url, image_one_id, image_two_id,
            stat1_value, stat1_label, stat2_value, stat2_label,
            floating_badge_line1, floating_badge_line2
          ) VALUES (
            $1, $2, $3, $4, $5, $6, $7,
            $8, $9, $10, $11,
            $12, $13, $14, $15,
            $16, $17
          )`,
          [
            2, 4, 'layout', newId, row.badge, row.heading, row.description,
            row.button_text, row.button_url, row.image_one_id, row.image_two_id,
            row.stat1_value, row.stat1_label, row.stat2_value, row.stat2_label,
            row.floating_badge_line1, row.floating_badge_line2
          ]
        );
        console.log('Inserted AboutUs block to Home page (ID 4)!');
      }
    }
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await pool.end();
  }
}

main();
