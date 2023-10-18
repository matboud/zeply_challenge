import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./myDatabase.db");

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS search_query
            (
                id          INTEGER PRIMARY KEY AUTOINCREMENT,
                query_type  TEXT,
                query_value TEXT ,
                score       NUMERIC,
                created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                UNIQUE (query_type, query_value)
            )`);

    // db.all(`SELECT *
    //         FROM search_query
    //         where query_type = 'address'
    //         order by score desc`, (err, rows) => {
    //     if (err) {
    //         console.error(err);
    //         return;
    //     }
    //     console.log(rows);
    // });
});


export default db;