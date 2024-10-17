import express from 'express';
import fetch from 'node-fetch';


const router = express.Router();


router.get('/dealer', async (req, res) => {
    try {
        const response = await fetch('http://158.247.122.111:3000/car/dealer');
        const data = await response.json();
        res.json(data.data);
        console.log(data.data,);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching dealer' });
    }
});

export default router;