import mongoose from 'mongoose';


const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique:true,
    },
    password: {
        type: String,
        required:true,

    },

    position: String,


    employeeCode:String,

    companyId:{
    type: mongoose.Schema.Types.ObjectId,
        ref:'Company'
    }
}, {
      timestamps:true
});

const Employee = mongoose.model('Employee', employeeSchema);

export default Employee;