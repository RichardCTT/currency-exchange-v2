import express from 'express';
import pool from '../config/db.js'

const router = express.Router();
const conn = await pool.getConnection();

router.delete('/:id', (req, res) => {
    // let userId = req.params.id;
    const userId = parseInt(req.params.id);
    if(isNaN(userId))
    {
        return res.status(500).json("invalid userId!");
    }
    try {
        const queryResult = conn.query("delete from user where user_id = ?", [userId]);
        if (queryResult.affectRows === 0) {
            console.log("no records are affected!");
        } else {
            console.log("delete successful");
        }
        return res.end("ok");
    }
    catch (error) {
        console.log("delete failed");
        res.status(500).json("delete failed");
    } finally {
        if (conn) {
            conn.release();
        }
    }
});



export default router;
