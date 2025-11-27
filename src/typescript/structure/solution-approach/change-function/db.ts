import { Pool, QueryResult } from 'pg';

const pool = new Pool({
    user: 'your_db_user',
    host: 'localhost',
    database: 'your_db_name',
    password: 'your_db_password',
    port: 5432,
});

export interface DBResult<T> {
    success: boolean;
    data: T | null;
    error?: string;
}

/**
 * @deprecated Use `executeQuery` instead. This function will be removed in future releases.
 *
 * Executes a raw SQL query.
 *
 * @param sql - The SQL query string.
 * @param params - The parameters for the SQL query.
 * @returns A promise that resolves to the query result.
 */
export async function query<T>(sql: string, params?: any[]): Promise<DBResult<T[]>> {
    console.warn('Warning: `query` is deprecated. Please use `executeQuery` instead.');
    try {
        const result: QueryResult<T> = await pool.query<T>(sql, params);
        return {
            success: true,
            data: result.rows,
        };
    } catch (error) {
        console.error('Database query failed:', error);
        return {
            success: false,
            data: null,
            error: (error as Error).message,
        };
    }
}

/**
 * Executes a SQL query with enhanced type safety, logging, and error handling.
 *
 * @param sql - The SQL query string.
 * @param params - The parameters for the SQL query.
 * @returns A promise that resolves to the query result.
 */
export async function executeQuery<T>(sql: string, params?: any[]): Promise<DBResult<T[]>> {
    console.log(`Executing SQL Query: ${sql} | Params: ${JSON.stringify(params)}`);
    try {
        const result: QueryResult<T> = await pool.query<T>(sql, params);
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
            error: (error as Error).message,
        };
    }
}
