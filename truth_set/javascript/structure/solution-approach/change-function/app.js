import { query } from './db.js';

/**
 * @typedef {Object} User
 * @property {number} id - The unique identifier for the user.
 * @property {string} name - The name of the user.
 * @property {string} email - The email address of the user.
 */

/**
 * Fetches all users from the database.
 *
 * @returns {Promise<import('./db.js').DBResult<User[]>>} A promise that resolves to the result containing an array of users.
 */
async function getAllUsers() {
    const result = await query('SELECT id, name, email FROM users;');
    return result;
}

/**
 * Adds a new user to the database.
 *
 * @param {string} name - The name of the user to add.
 * @param {string} email - The email address of the user to add.
 * @returns {Promise<import('./db.js').DBResult<unknown[]>>} A promise that resolves to the result of the insertion.
 */
async function addUser(name, email) {
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