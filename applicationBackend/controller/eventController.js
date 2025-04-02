import events from "../models/eventModel.js";



export const createEvent =async(req, res)=>{

    try{
        // Extracting values from the request body sent by the frontend
        const {eventName, eventDate, eventLocation, eventDescription, eventRequirements}=req.body;
        // Creating a new instance of the event model with the extracted data
        const event=new events({eventName, eventDate, eventLocation, eventDescription, eventRequirements});

        //Saving the eventData to the database
        await event.save();
        res.status(201).json({success:true, message:'Event created successfully'});
    }catch(error){
        // Display the error if your event is not created
        res.status(500).json({success:false, message:'Server error', error:error.message})
    }
}

export const displayEvents = async(req, res)=>{
    try{
        // Fetching all the event data from the database
        const event=await events.find();
        res.status(200).json({success:true, data:event})
    }catch(error){
        //Display the error if your event is not working
        res.status(500).json({success:false, message:'Fetch failed', error:error.message})
    }
}


export const getEventsById=async(req, res)=>{

    const {id} = req.params;
    try{
        //Fetch event that matches the id from the database
        const event = await events.findById(id);
        if(!event) {
            //Display error if event not found
            return res.status(404).json({success:false, message:"Event not found"});
        }
        res.status(200).json({success:true, event});
        
    }
    catch(error){
        //Display error if the form has got any kind of bug
        res.status(500).json({success:false,message:"Server error", error:error.message });
    };
}

export const deleteEvent = async (req, res) => {
    try {
        const eventId = req.params.id; 

        const deletedEvent = await events.findByIdAndDelete(eventId);
        
        if (!deletedEvent) {
            return res.status(404).json({ success: false, message: "Event not found" });
        }

        res.status(200).json({ success: true, message: "Event deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
}
export const updateEventById = async (req, res) => {
    try{

        const {id} = req.params;

        const updated_data= await events.findByIdAndUpdate(id, req.body);
        if(!updated_data){
            return res.status(404).json({ success: false, message: "Event not found" });
        }
        res.status(200).json({ success: true, message: "Event updated successfully", data: updated_data });

    }catch(error){
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
}
