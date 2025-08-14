
import mongoose from 'mongoose';
import express from 'express';
import Employee from '../models/Employee.js';

const router = express.Router();


router.post('/', async (req, res) => {
    try {
        const employee = new Employee(req.body);
        await employee.save();
        res.status(201).json(employee);

    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const employee = await Employee.findOne({ email });

        if (!employee) {
            return res.status(404).json({
                error: 'Could not found employee'
            });
        }
        if (employee.password !== password) {
            
            return res.status(401).json({ error: 'Password failed' });

        } else {
            res.status(200).json({ success: true, employee });
        }
    
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.get('/', async(req, res) => {
    try {
        const employees = await Employee.find().populate('companyId');
        
        res.json(employees)
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
router.get('/:id', async(req, res) => {
    try {
        const employees = await Employee.findById(req.params.id).populate('companyId');
        if (!employees) return res.status(400).json({ error: err.message });
        res.json(employees)
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/:id', async (req, res) => {
   
    try {
        
        const { id } = req.params;
        const updated = await Employee.findByIdAndUpdate(id,req.body, { new:true });
        res.json(updated);
      
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid ID-format' });
    }

    try {
 
        const deleted = await Employee.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).json({ error: 'Could not found employee' });
        }
        res.status(200).json({message:'Employee removed'});
    } catch (err) {
        console.error("Fel vid borttagning:", err); // Viktigt för att se exakt fel
  res.status(500).json({ error: 'Server error', details: err.message })
    }
});
export default router;