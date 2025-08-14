import express from 'express';
import Company from '../models/Company.js';
import mongoose from 'mongoose';
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const company = new Company(req.body);
        await company.save();
        res.status(201).json(company);
    } catch (err) {
        res.status(400).json({ error: err.message });

    }
});
router.post('/login', async (req, res) => {

    const { email, password } = req.body;
    console.log("Login attempt:", email, password);

    try {
        const company = await Company.findOne({email});
        console.log("Found company:", company);
        if (!company) {
            return res.status(404).json({ error: 'Could not found company' });
        }
        if (company.password !== password) {
            return res.status(401).json({ error: 'Failed password' });
        }
        else {
            res.status(200).json({ success: true, company });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
        
    }
    
});

router.get('/test', (req, res) => {
    res.json({ message: 'Company route is working!' });
  });



router.get('/', async (req, res) => {

    try {
        const companies = await Company.find();
        res.json(companies);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
  
});




router.get('/:id', async (req, res) => {

    try {
        const companies = await Company.find();
        res.json(companies);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
  
});

router.put('/:id', async (req, res) => {
    try {
       
        const { id } = req.params;
        const updated = await Company.findByIdAndUpdate(id,req.body, { new:true });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ error: err.message });

    }
});


router.delete('/:id', async (req, res) => {
    console.log(req.params.id);
    
    try {
        const { id } = req.params;


        if (!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({ error: 'Invalid company ID' });
        }

        const deleted = await Company.findByIdAndDelete(id);
        console.log('Delte company',deleted);

        if (!deleted) {
            return res.status(404).json({error:'Company not found'})
        }

        res.json(deleted);

    } catch (err) {
        console.error('Deleted error:',err)
        res.status(500).json({ error: err.message });
    }
});
export default router;