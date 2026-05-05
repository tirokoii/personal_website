import Database from "better-sqlite3";

// Skapa databas
const db = new Database('tirokoii.db')
db.pragma('journal_mode = WAL') // För att reversa om det blir fel

db.exec(`
    CREATE TABLE IF NOT EXISTS blogPost
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at DEFAULT CURRENT_TIMESTAMP`)

const count = db.prepare('SELECT COUNT(*) as count FROM items').get();

export default db;