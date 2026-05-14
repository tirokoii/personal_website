import Database from "better-sqlite3";
import "dotenv/config"

// Skapa databas
const db = new Database(process.env.DATABASE_DATABASE)
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
        post_id     INTEGER NOT NULL,
        tag_id      INTEGER NOT NULL
    )
`)

// const count = db.prepare('SELECT COUNT(*) as count FROM postTag').get()
// for (let i = 0; i < count; ++i) {
//     db.exec(`
//         DELETE FROM postTag 
//         WHERE id = ${id}
// `)}

// const count = db.prepare('SELECT COUNT(*) as count FROM blogPost').get()
// for (let i = 0; i < count; ++i) {
//     db.exec(`
//         DELETE FROM blogPost
//         WHERE id = ${id}
// `)}

const user_count = db.prepare('SELECT COUNT(*) as count FROM user').get()
if (user_count.count === 0) {
    const insert = db.prepare('INSERT INTO user (name, hash_password, pet_name) VALUES (?, ?, ?)')
    insert.run(process.env.DATABASE_USERNAME, process.env.DATABASE_PASSWORD, process.env.DATABASE_PETNAME)
}

console.log(process.env.DATABASE_DATABASE)

const tag_count = db.prepare('SELECT COUNT(*) as count FROM tag').get()
if (tag_count.count === 0) {
    const insert = db.prepare('INSERT INTO tag (name) VALUES (?)')
    const tags = ["HAPPY", "UPDATES", "CODE", "FANTASIES", "DREAM", "ANIMAL", "GAMES", "INTERESTS", "ART", "MINDBUGLE", "SADGE", "EMOTIONS", "CONCEPT", "IDEA", "WEBSITE", "IMPROVMENT"]
    tags.forEach(tag => {
        insert.run(tag)
    });
}

export default db;