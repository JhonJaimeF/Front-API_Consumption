import express from 'express';
import fetch from 'node-fetch';


const router = express.Router();


router.get('/cars', async (req, res) => {
    try {
        const response = await fetch('http://localhost:3000/car');
        const data = await response.json();
        res.json(data.data);
        console.log(data.data,);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching cars' });
    }
});

router.post("", async (req,)=> {
    try {
        const response = await fetch("");
        
    }catch{

    } 
});

export default router;