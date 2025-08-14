import mongoose from 'mongoose';

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required:true,
    },
    password: {
        type: String,
        required:true,
    },
    companyNumber:{
        type: String,
        require:true,    
    },
    
    location: String,
}, {
    timestamps: true,  
});
const Company = mongoose.model('Company', companySchema);

export default Company;