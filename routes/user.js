import express from 'express';
import pool from '../config/db.js'

const router = express.Router();
const conn = pool.getConnection();

router.delete('/:id', (req, res) => {
    const userId = req.params.id
    try {
        const queryResult = conn.query("delete from user where id = $1", [userId]);
        if (queryResult.affectRows === 0) {
            console.log("no records are affected!");
        } else {
            console.log("delete successful");
        }
    }
    catch (error) {
        console.log("delete failed");
    } finally {
        if (conn) {
            conn.release();
        }
    }
});



export default router;
