import { Client } from 'pg';
import Cursor from 'pg-cursor';

async function fetchUsers() {
    const client = new Client({
        user: 'dbuser',
        host: 'localhost',
        database: 'mydb',
        password: 'secretpassword',
        port: 5432,
    });

    try {
        await client.connect();
        const cursor = client.query(new Cursor('SELECT * FROM users'));

        cursor.read(100, (err, rows) => {
            if (err) {
                console.error('Error reading rows:', err);
            } else {
                console.log('Fetched rows:', rows);
            }
        });

    } catch (error) {
        console.error('Database error:', error);
    }
}

fetchUsers();
\ No newline at end of file