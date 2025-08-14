import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import companyRoutes from './routes/companyRoutes.js';
import employeeRoutes from './routes/employeeRoutes.js';

const app = express();


app.use(cors());
app.use(express.json());

app.use('/api/companies',companyRoutes);
app.use('/api/employees',employeeRoutes);

app.get('/', (req, res) => {
    res.send('Express API!');
});

async function main() {
    try{
    await mongoose.connect('mongodb://localhost:27017/company-db');
    console.log('Connected to MongoDB');


    app.listen(5000, () => {
        console.log('Server runnig on the http://localhost:5000');
    });
    } catch (err) {
        console.error('X MongoDb connection error');
}
}
main();






