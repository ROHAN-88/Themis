const db = require("../config/db");
const bcrypt = require("bcrypt");
const insertUser = async ({
  name,
  email,
  password,
  phoneno,
  address,
  age,
  gender,
}) => {
  const query = `INSERT INTO users(name,email,password,phoneno,address,age,gender)VALUES ($1, $2, $3, $4, $5, $6,$7)`;
  const password_encrypt = await bcrypt.hash(password, 8);
  console.log(password_encrypt);
  const { rows } = await db.query(query, [
    name,
    email,
    password_encrypt,
    phoneno,
    address,
    age,
    gender,
  ]);

  return [0];
};

const findAllUsers = async () => {
  const { rows } = await db.query(`SELECT * FROM users`);
  return rows;
};

const delete_user_by_id = async (id) => {
  const query = `DELETE FROM users WHERE id = $1`;
  await db.query(query, [id]);
};

const update_user_detail = async (
  id,
  name,
  email,
  phoneno,
  address,
  age,
  gender,
) => {
  const query = `UPDATE users SET name = $1,email=$2,phoneno = $3,address = $4,age = $5,gender = $6 WHERE id = $7 RETURNING *`;

  const result = await db.query(query, [
    name,
    email,
    phoneno,
    address,
    age,
    gender,
    id,
  ]);

  return result.rows;
};

module.exports = {
  insertUser,
  findAllUsers,
  delete_user_by_id,
  update_user_detail,
};
