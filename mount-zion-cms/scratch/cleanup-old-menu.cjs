const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgres://postgres:Yenmin%40123@localhost:5432/mount-zion-cms',
});

async function main() {
  try {
    // Drop old unused menu enum types if they exist so drizzle won't ask rename questions
    await pool.query(`
      DROP TABLE IF EXISTS "_menu_v" CASCADE;
      DROP TABLE IF EXISTS "menu" CASCADE;
      DROP TABLE IF EXISTS "_menu_v_version_menu_items" CASCADE;
      DROP TABLE IF EXISTS "_menu_v_version_menu_items_submenu_items" CASCADE;
      DROP TABLE IF EXISTS "menu_menu_items" CASCADE;
      DROP TABLE IF EXISTS "menu_menu_items_submenu_items" CASCADE;
      DROP TYPE IF EXISTS "enum__menu_v_version_menu_items_link_type" CASCADE;
      DROP TYPE IF EXISTS "enum__menu_v_version_menu_items_submenu_items_link_type" CASCADE;
      DROP TYPE IF EXISTS "enum__menu_v_version_status" CASCADE;
      DROP TYPE IF EXISTS "enum_menu_menu_items_link_type" CASCADE;
      DROP TYPE IF EXISTS "enum_menu_menu_items_submenu_items_link_type" CASCADE;
      DROP TYPE IF EXISTS "enum_menu_status" CASCADE;
    `);
    console.log('Cleaned old unused menu tables and enums successfully.');
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await pool.end();
  }
}

main();
