const e = require("express");
const db = require("../config/db");

const get_all_task = async () => {
  const query = `SELECT * FROM tasks`;
  const { rows } = await db.query(query);

  return rows;
};

const create_task_query = async (values, created_user_id) => {
  const query = `INSERT INTO tasks (tasks_name,description,priority,created_by,assignee_to,status) VALUES ($1,$2,$3,$4,$5,$6);`;

  const { task_name, description, priority, assignee_to, status } = values;

  const created_by = created_user_id;
  const result = await db.query(query, [
    task_name,
    description,
    priority,
    created_by,
    assignee_to,
    status,
  ]);
  return result;
};

const update_task_query = async (values, task_id) => {
  const query = `UPDATE tasks set tasks_name=$1,description = $2 ,priority=$3,created_by=$4,assignee_to=$5,status=$6) WHERE id = $7`;
  const results = await db.query(query, [
    values.tasks_name,
    values.description,
    values.priority,
    values.created_by,
    values.assignee_to,
    values.status,
    task_id,
  ]);
  return results;
};

module.exports = { create_task_query, update_task_query, get_all_task };
