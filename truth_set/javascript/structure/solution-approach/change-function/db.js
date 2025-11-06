import { Pool } from 'pg';

const pool = new Pool({
    user: 'your_db_user',
    host: 'localhost',
    database: 'your_db_name',
    password: 'your_db_password',
    port: 5432,
});

/**
 * @typedef {Object} DBResult
 * @property {boolean} success - Indicates if the query was successful.
 * @property {Array} data - The data returned from the query.
 * @property {string} [error] - The error message if the query failed.
 */

/**
 * @deprecated Use `executeQuery` instead. This function will be removed in future releases.
 *
 * Executes a raw SQL query.
 *
 * @param {string} sql - The SQL query string.
 * @param {Array} [params] - The parameters for the SQL query.
 * @returns {Promise<DBResult>} A promise that resolves to the query result.
 */
export async function query(sql, params) {
    console.warn('Warning: `query` is deprecated. Please use `executeQuery` instead.');
    try {
        const result = await pool.query(sql, params);
        return {
            success: true,
            data: result.rows,
        };
    } catch (error) {
        console.error('Database query failed:', error);
        return {
            success: false,
            data: null,
            error: error.message,
        };
    }
}

/**
 * Executes a SQL query with enhanced logging and error handling.
 *
 * @param {string} sql - The SQL query string.
 * @param {Array} [params] - The parameters for the SQL query.
 * @returns {Promise<DBResult>} A promise that resolves to the query result.
 */
export async function executeQuery(sql, params) {
    console.log(`Executing SQL Query: ${sql} | Params: ${JSON.stringify(params)}`);
    try {
        const result = await pool.query(sql, params);
        console.log(`Query executed successfully. Rows returned: ${result.rowCount}`);
        return {
            success: true,
            data: result.rows,
        };
    } catch (error) {
        console.error('Enhanced database query failed:', error);
        return {
            success: false,
            data: null,
            error: error.message,
        };
    }
}
\ No newline at end of file