// controller/trainingsController.js
import Trainings from '../models/trainingsModel.js';
import Department from '../models/departmentsModel.js';

// CREATE training
export const createTraining = async (req, res) => {
  try {
    const {
      trainingName,
      trainingObjective,
      trainingDuration,
      trainingMode,
      trainingRequirements,
      departmentId
    } = req.body;

    const department = await Department.findById(departmentId);
    if (!department) {
      return res.status(404).json({ success: false, message: "Department not found" });
    }

    const newTraining = new Trainings({
      trainingName,
      trainingObjective,
      trainingDuration,
      trainingMode,
      trainingRequirements,
      departmentId: department._id
    });

    await newTraining.save();
    res.status(201).json({ success: true, message: "Training created successfully", data: newTraining });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// GET all trainings
export const getAllTrainings = async (req, res) => {
  try {
    const trainings = await Trainings.find().populate('departmentId');
    res.status(200).json({ success: true, data: trainings });
  } catch (error) {
    res.status(500).json({ success: false, message: "Fetch failed", error: error.message });
  }
};

// GET training by ID
export const getTrainingById = async (req, res) => {
  try {
    const training = await Trainings.findById(req.params.id).populate('departmentId');
    if (!training) {
      return res.status(404).json({ success: false, message: "Training not found" });
    }
    res.status(200).json({ success: true, data: training });
  } catch (error) {
    res.status(500).json({ success: false, message: "Fetch failed", error: error.message });
  }
};

// UPDATE training
export const updateTraining = async (req, res) => {
  try {
    const updatedTraining = await Trainings.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTraining) {
      return res.status(404).json({ success: false, message: "Training not found" });
    }
    res.status(200).json({ success: true, message: "Training updated successfully", data: updatedTraining });
  } catch (error) {
    res.status(500).json({ success: false, message: "Update failed", error: error.message });
  }
};

// DELETE training
export const deleteTraining = async (req, res) => {
  try {
    const deleted = await Trainings.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Training not found" });
    }
    res.status(200).json({ success: true, message: "Training deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Delete failed", error: error.message });
  }
};
