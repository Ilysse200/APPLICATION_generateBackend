import events from "../models/eventModel.js";
import Department from "../models/departmentsModel.js";

export const createEvent = async (req, res) => {
  try {
    const {
      eventName,
      eventDate,
      eventLocation,
      eventDescription,
      eventRequirements,
      department
    } = req.body;

    // Verify the department exists and get its name and vacancyType

    
    const departmentId = await Department.findById(department);
    console.log('Department ID:', department);
    if (!departmentId) {
      return res.status(404).json({ success: false, message: "Department not found" });
    }

    const event = new events({
      eventName,
      eventDate,
      eventLocation,
      eventDescription,
      eventRequirements,
      department: departmentId._id
    });

    await event.save();
    res.status(201).json({ success: true, message: 'Event created successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

export const displayEvents = async (req, res) => {
  try {
    const event = await events.find().populate('department', 'name vacancyType');
    res.status(200).json({ success: true, data: event });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Fetch failed', error: error.message });
  }
};

export const getEventsById = async (req, res) => {
  const { id } = req.params;
  try {
    const event = await events.findById(id).populate('department', 'name vacancyType');
    if (!event) {
      return res.status(404).json({ success: false, message: "Event not found" });
    }
    res.status(200).json({ success: true, event });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

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
};

export const updateEventById = async (req, res) => {
  try {
    const { id } = req.params;
    const updated_data = await events.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated_data) {
      return res.status(404).json({ success: false, message: "Event not found" });
    }
    res.status(200).json({ success: true, message: "Event updated successfully", data: updated_data });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};
