import {connect} from '../database';

export const getTasks = async (req, res) => {
    const db = await connect();
    const [rows] = await db.query('SELECT * FROM TASKS')
    res.send(rows)
}

export const getTask = async (req, res) => {
    const db = await connect();
    const [rows] = await db.query(`SELECT * FROM tasks WHERE id = ${req.params.id}`)
    res.json(rows[0])
    
}

export const getTaskCount = async (req, res) => {
    const db = await connect();
    const [rows] = await db.query(`SELECT COUNT(*) FROM tasks`)
    res.json(rows)
}

export const saveTask = async (req, res) => {
    const db = await connect();
    const [result] = await db.query(`INSERT INTO tasks(title, description) VALUES (?, ?)`, [
        req.body.title,
        req.body.description
    ])
    res.json({
        id: result.insertId,
        ...req.body
    })
}

export const deleteTask = async (req, res) => {
    const db = await connect();
    await db.query(`DELETE FROM tasks WHERE id = ${req.params.id}`)
    res.sendStatus(204)
}
export const updateTask = async (req, res) => {
    const db = await connect();
    await db.query(`UPDATE tasks SET ? WHERE id = ?`, [
        req.body,
        req.params.id
    ])
    res.sendStatus(204)
}