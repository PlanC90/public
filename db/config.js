import pg from 'pg';
const { Pool } = pg;

// PostgreSQL connection configuration
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Test the connection
pool.connect((err) => {
  if (err) {
    console.error('Database connection error:', err);
  } else {
    console.log('Database connection successful');
  }
});

// Promise wrapper for database operations
export const dbAsync = {
  async query(text, params = []) {
    try {
      const result = await pool.query(text, params);
      return result.rows;
    } catch (error) {
      console.error('Database query error:', error);
      throw error;
    }
  },

  async get(text, params = []) {
    const result = await this.query(text, params);
    return result[0];
  },

  async run(text, params = []) {
    return await this.query(text, params);
  }
};

export default pool;