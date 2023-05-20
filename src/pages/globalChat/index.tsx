import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});


export async function insertUser(name: any, email: any, password: any, bio: any) {
  const query = {
    text: 'INSERT INTO users(name, email, password, bio) VALUES($1, $2, $3, $4) RETURNING id',
    values: ["Elin Mask", "elin.mask@test.com", "HardToGuess!1960", null]
  };

  try {
    const result = await pool.query(query);
    return result
  }
  catch (err) {
    console.error('Erreur lors de l\'insertion de l\'utilisateur : ', err);
    throw err;
  }
}
