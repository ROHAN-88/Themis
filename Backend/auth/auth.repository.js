const express = require("express");
const bcrypt= require ("bcrypt")
const { StatusCodes } = require("http-status-codes");
const db = require("../config/db");

const user_login = async (email) => {
  const query = `SELECT email,password,id FROM users WHERE email = $1`;
  const user_detail = await db.query(query, [email]);

  return user_detail.rows[0];
};

const user_signup_repository = async (values)=>{
const {name,email,password,phoneno}=values;

const query = `INSERT INTO users(name,email,password,phoneno) VALUES ($1,$2,$3,$4)`;
const password_encrypt = await bcrypt.hash(password,8); 
await db.query(query,[name,email,password_encrypt,phoneno]);
}
module.exports = { user_login ,user_signup_repository};
