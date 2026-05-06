import Database from "better-sqlite3";

// Skapa databas
const db = new Database('tirokoii.db')
db.pragma('journal_mode = WAL') // För att reversa om det blir fel

// db.exec(`
//     CREATE TABLE IF NOT EXISTS blogPost (
//         id         INTEGER PRIMARY KEY AUTOINCREMENT,
//         title      TEXT NOT NULL,
//         content    TEXT NOT NULL,
//         created_at TEXT DEFAULT (datetime('now'))
//     )
// `)

// const count = db.prepare('SELECT COUNT(*) as count FROM blog').get();

db.exec(`
    CREATE TABLE IF NOT EXISTS user (
        id            INTEGER PRIMARY KEY AUTOINCREMENT,
        name          TEXT NOT NULL,
        hash_password TEXT NOT NULL,
        updated_at    TEXT DEFAULT (datetime('now'))
    )
`)

const count = db.prepare('SELECT COUNT(*) as count FROM user').get()
if (count.count === 0) {
    const insert = db.prepare('INSERT INTO user (name, hash_password) VALUES (?, ?)')
    insert.run("Flashdonuts_49", "$2b$10$ngyNrlrJnnxDX.gIVuqJBeMciuUH.xyjSt/yCxZ8kQsqEgnBWb8V2")
}
export default db;