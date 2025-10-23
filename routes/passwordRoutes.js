import express from 'express'
import { addPassword, deletePassword, getallPassword } from '../controllers/password.js';
const router = express.Router();

// /api/pass/add
router.post('/add',addPassword)

// /api/pass/all
router.get('/all',getallPassword)

// /api/pass/delete
router.delete('/delete/:id',deletePassword)

export default router;