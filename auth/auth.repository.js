const express = require("express");
const { StatusCodes } = require("http-status-codes");
const db = require("../config/db");

const user_login = async (email) => {
  const query = `SELECT email,password,id FROM users WHERE email = $1`;
  const user_detail = await db.query(query, [email]);

  return user_detail.rows[0];
};

module.exports = { user_login };
