import Form from '../models/formModel.js'

export const displayApplication=async(req, res)=>{

    try{
        // Getting all form data from the database
        const forms=await Form.find();
        if(!forms){
            return res.status(404).json({ success: false, message: 'No form found' });
        }
        res.status(200).json({ success: true, data: forms });
    }catch(error){
        // Error handling
        res.status(500).json({ success: false, message:'An error occured while retrieving the form',error: error.message });
    }
}

export const FetchByPosition = async(req, res)=>{
    try{

        const {jobPosition} = req.body; //Extract jobPosition from the body
            if(!jobPosition){
                return res.status(404).json({ success: false, message: 'No Job Position found' });
            }
            const positionName =await Form.find({jobPosition}); // Query with field name
            if(positionName.length ==0){//use .length because find returns an array
                return res.status(404).json({ success: false, message: 'No form found for the given job position' });
            } 
            res.status(200).json({ success: true, data: positionName});


    }catch(error){
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
}