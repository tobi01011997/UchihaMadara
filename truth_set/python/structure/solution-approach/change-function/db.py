import psycopg2
from typing import Dict, List, Optional, TypedDict, Union
from dataclasses import dataclass

class DBResult(TypedDict):
    success: bool
    data: Optional[List]
    error: Optional[str]

class Database:
    def __init__(self):
        self.conn = psycopg2.connect(
            user='your_db_user',
            host='localhost',
            database='your_db_name',
            password='your_db_password',
            port=5432
        )

    def query(self, sql: str, params: Optional[List] = None) -> DBResult:
        """
        DEPRECATED: Use execute_query instead. This function will be removed in future releases.
        """
        import warnings
        warnings.warn('Warning: `query` is deprecated. Please use `execute_query` instead.')
        
        try:
            cur = self.conn.cursor()
            cur.execute(sql, params or [])
            result = cur.fetchall()
            self.conn.commit()
            return {"success": True, "data": result, "error": None}
        except Exception as error:
            print(f"Database query failed: {error}")
            return {"success": False, "data": None, "error": str(error)}
        finally:
            cur.close()

    def execute_query(self, sql: str, params: Optional[List] = None) -> DBResult:
        """
        Executes a SQL query with enhanced logging and error handling.
        """
        print(f"Executing SQL Query: {sql} | Params: {params}")
        try:
            cur = self.conn.cursor()
            cur.execute(sql, params or [])
            result = cur.fetchall()
            row_count = cur.rowcount
            self.conn.commit()
            print(f"Query executed successfully. Rows affected: {row_count}")
            return {"success": True, "data": result, "error": None}
        except Exception as error:
            print(f"Enhanced database query failed: {error}")
            return {"success": False, "data": None, "error": str(error)}
        finally:
            cur.close()
\ No newline at end of file