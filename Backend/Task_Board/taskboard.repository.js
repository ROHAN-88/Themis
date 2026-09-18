const e = require("express");
const db = require("../config/db");

const get_all_task = async () => {
  const query = `SELECT * FROM tasks;`;
  const { rows } = await db.query(query);

  return rows;
};

const create_task_query = async (values, created_user_id) => {
  const query = `INSERT INTO tasks (task_name,description,priority,created_by,assignee_to,status) VALUES ($1,$2,$3,$4,$5,$6);`;

  const { task_name, description, priority, assignee_to, task_type, status } =
    values;

  const created_by = created_user_id;
  const result = await db.query(query, [
    task_name,
    description,
    priority,
    created_by,
    assignee_to,
    task_type,
    status,
  ]);
  return result;
};

const update_task_query = async (values, task_id, update_user_id) => {
  console.log(values, update_user_id, task_id);
  const query = `UPDATE tasks set task_name=$1,description = $2 ,priority=$3,updated_by=$4,assignee_to=$5,task_type=$6 ,status=$7 WHERE id = $7;`;
  console.log(query);
  const results = await db.query(query, [
    values.task_name,
    values.description,
    values.priority,
    update_user_id.id,
    values.assignee_to,
    values.task_type,
    values.status,
    task_id,
  ]);
  console.log(results);
  return results;
};

const archive_Task = async (task_id, value) => {
  const query = `UPDATE tasks set is_archived = $1 where id = $2;`;
  await db.query(query, [value.is_archived, task_id]);
};

// get all the list of task_type table data
const get_all_task_type = async () => {
  const query = `SELECT * FROM task_type;`;
  const { rows } = await db.query(query);
  return rows;
};

const create_task_type_sql = async (values) => {
  const query = `INSERT INTO task_type (title,color) VALUES ($1,$2) `;

  await db.query(query, [values.title, values.color]);
};

const update_task_type_sql = async (values, id) => {
  const query = `UPDATE task_type SET title=$1,color=$2 where id=$3;`;

  await db.query(query, [values.title, values.color, id]);
};
module.exports = {
  create_task_query,
  update_task_query,
  get_all_task,
  archive_Task,
  get_all_task_type,
  create_task_type_sql,
  update_task_type_sql,
};
