import Form from '../models/formModel.js'


export const createForm =async(req, res)=>{

    try{
        // Extracting values from the request body sent by the frontend
        const {name, email, phone, department, jobPosition, referral}=req.body;
        // Creating a new instance of the Form model with the extracted data
        const form=new Form({name, email, phone, department, jobPosition, referral});

        //Saving the formData to the database
        await form.save();
        res.status(201).json({success:true, message:'Form created successfully'});
    }catch(error){
        // Display the error if you form is not created
        res.status(500).json({success:false, message:'Server error', error:error.message})
    }
}

export const displayFoms = async(req, res)=>{
    try{
        // Fetching all the form data from the database
        const forms=await Form.find();
        res.status(200).json({success:true, data:forms})
    }catch(error){
        //Display the error if your form is not working
        res.status(500).json({success:false, message:'Fetch failed', error:error.message})
    }
}
//Fetch departments with their respective jobPositions

export const getJobPositions = async (req, res) => {
    try {
        // Fetching all the form data from the database
        const forms = await Form.find();
        const departmentMap = {};

        forms.forEach((form) => {
            const { department, jobPosition } = form;
          
            if (!departmentMap[department]) {
              departmentMap[department] = new Set();
            }
          
            departmentMap[department].add(jobPosition);
          });
          // Convert Sets to arrays
        const result = Object.entries(departmentMap).map(([department, positionsSet]) => ({
        department,
        jobPositions: Array.from(positionsSet),
      }));
          

        res.status(200).json({ success: true, data: result });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

//Get all available departments

export const getDepartments = async (req, res) => {
    try {
        // ✅ Return predefined department names (No need to query the database)
        const departments = ["IT Department", "Finance Department", "Business Department", "Sales Department"];

        res.status(200).json({ success: true, data: departments });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

export const getFormsById=async(req, res)=>{

    const {id} = req.params;
    try{
        //Fetch form that matches the id from the database
        const forms = await Form.findById(id);
        if(!forms) {
            //Display error if form not found
            return res.status(404).json({success:false, message:"Form not found"});
        }
        res.status(200).json({success:true, forms});
        
    }
    catch(error){
        //Display error if the form has got any kind of bug
        res.status(500).json({success:false,message:"Server error", error:error.message });
    };
}

export const deleteFormById = async (req, res) => {
    try {
        const formId = req.params.id; 

        const deletedForm = await Form.findByIdAndDelete(formId);
        
        if (!deletedForm) {
            return res.status(404).json({ success: false, message: "Form not found" });
        }

        res.status(200).json({ success: true, message: "Form deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
}
export const updateFormById = async (req, res) => {
    try{

        const {id} = req.params;

        const updated_data= await Form.findByIdAndUpdate(id, req.body);
        if(!updated_data){
            return res.status(404).json({ success: false, message: "Form not found" });
        }
        res.status(200).json({ success: true, message: "Form updated successfully", data: updated_data });

    }catch(error){
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
}
