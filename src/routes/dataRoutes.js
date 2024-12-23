import express from 'express';
import { saveData } from '../services/dataService.js';

const router = express.Router();

router.post('/save/:fileName', async (req, res) => {
    try {
        await saveData(req.params.fileName, req.body);
        res.status(200).json({ message: 'Data saved successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error saving data' });
    }
});

export default router;