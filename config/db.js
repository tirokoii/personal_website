import Database from "better-sqlite3";

// Skapa databas
const db = new Database('tirokoii.db')
db.pragma('journal_mode = WAL')

db.exec(`
    CREATE TABLE IF NOT EXISTS user (
        id              INTEGER PRIMARY KEY AUTOINCREMENT,
        name            TEXT NOT NULL,
        hash_password   TEXT NOT NULL,
        pet_name        TEXT NOT NULL,
        updated_at      TEXT DEFAULT (datetime('now'))
    )
`)

db.exec(`
    CREATE TABLE IF NOT EXISTS blogPost (
        id          INTEGER PRIMARY KEY AUTOINCREMENT,
        title       TEXT NOT NULL,
        content     TEXT NOT NULL,
        created_at  TEXT DEFAULT (datetime('now'))
    )
`)

db.exec(`
    CREATE TABLE IF NOT EXISTS tag (
        id          INTEGER PRIMARY KEY AUTOINCREMENT,
        name        TEXT NOT NULL,
        created_at  TEXT DEFAULT (datetime('now'))
    )
`)

db.exec(`
    CREATE TABLE IF NOT EXISTS postTag (
        id          INTEGER PRIMARY KEY AUTOINCREMENT,
        post_id     TEXT NOT NULL,
        tag_id      TEXT NOT NULL
    )
`)

db.exec(`
    DELETE FROM blogPOST 
    WHERE id = 4`)



const count = db.prepare('SELECT COUNT(*) as count FROM tag').get()
if (count.count === 0) {
    const insert = db.prepare('INSERT INTO tag (name) VALUES (?)')
    const tags = ["HAPPY", "UPDATES", "CODE", "FANTASIES", "DREAM", "ANIMAL", "GAMES", "INTERESTS", "ART", "MINDBUGLE", "SADGE", "EMOTIONS", "CONCEPT", "IDEA", "WEBSITE", "IMPROVMENT"]
    tags.forEach(tag => {
        insert.run(tag)
    });
}
export default db;