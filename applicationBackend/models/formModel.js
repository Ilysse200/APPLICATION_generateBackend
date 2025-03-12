import mongoose from 'mongoose';
const {model, Schema} = mongoose;

const formSchema = new Schema({

    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    department:{
        type: String,
        enum:["IT Department", "Finance Department", "Business Department", "Sales Department"],
        required: true
    },
    jobPosition: {
        type: String,
        required: true,
        validate: {
            validator: function(value) {
                const departmentOptions = {
                    "IT Department": ["Software Engineer", "Data Scientist", "UX Designer"],
                    "Finance Department": ["Accountant", "Financial Analyst", "Auditor"],
                    "Business Department": ["Business Analyst", "Marketing Manager", "Product Manager"],
                    "Sales Department": ["Sales Representative", "Customer Support Specialist", "Sales Manager"],
                };
                return departmentOptions[this.department]?.includes(value);
                 },
            message: "Invalid job position for the selected department"
                }
    },
    referral:{
                type: String,
                enum:["Social Media", "Friend or Colleague", "Online Advertisement", "Search Engine", "Other"],
                required:true
    }

})

const Form = model('Form', formSchema)
export default Form
