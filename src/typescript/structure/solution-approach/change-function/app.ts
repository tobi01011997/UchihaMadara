import { query, DBResult } from './db';


interface User {
    id: number;
    name: string;
    email: string;
}


async function getAllUsers(): Promise<DBResult<User[]>> {
    const result = await query<User>('SELECT id, name, email FROM users;');
    return result;
}


async function addUser(name: string, email: string): Promise<DBResult<unknown[]>> {
    const result = await query('INSERT INTO users (name, email) VALUES ($1, $2);', [name, email]);
    return result;
}

(async () => {
    const usersOld = await getAllUsers();
    if (usersOld.success) {
        console.log('Users (Old):', usersOld.data);
    } else {
        console.error('Error fetching users (Old):', usersOld.error);
    }

    const addUserResultOld = await addUser('John Doe', 'john.doe@example.com');
    if (addUserResultOld.success) {
        console.log('User added successfully (Old).');
    } else {
        console.error('Error adding user (Old):', addUserResultOld.error);
    }
})();
\ No newline at end of file