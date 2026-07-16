const e = require("express");
const db = require("../config/db");

const create_task_query = async (values) => {
  const query = `INSERT INTO tasks (tasks_name,description,priority,status) VALUES ($1,$2,$3,$4);`;

  const { task_name, description, priority, status } = values;

  const result = await db.query(query, [
    task_name,
    description,
    priority,
    status,
  ]);
  return result;
};

module.exports = { create_task_query };
