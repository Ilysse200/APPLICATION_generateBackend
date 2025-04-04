// controllers/formBuilderController.js
import FormBlueprint from '../models/formBuilderModel.js';

// CREATE or UPDATE form blueprint by vacancyType
export const createOrUpdateBlueprint = async (req, res) => {
  try {
    const { vacancyType, fields } = req.body;
    const updated = await FormBlueprint.findOneAndUpdate(
      { vacancyType },
      { fields },
      { upsert: true, new: true }
    );
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to save blueprint', details: err.message });
  }
};
// GET all form blueprints
export const getAllBlueprints = async (req, res) => {
  try {
    const blueprints = await FormBlueprint.find();
    res.status(200).json(blueprints);
  } catch (err) {
    res.status(500).json({ error: 'Fetch all blueprints failed', details: err.message });
  }
};
export const getBlueprintByVacancyAndId = async (req, res) => {
  const { vacancyType, vacancyId } = req.params;

  try {
    const blueprint = await FormBlueprint.findOne({ vacancyType, vacancyId });
    
    if (!blueprint) {
      return res.status(404).json({ success: false, message: 'Form not found' });
    }

    res.status(200).json(blueprint);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching form', error: error.message });
  }
};


// GET blueprint by vacancyType
export const getBlueprintByVacancy = async (req, res) => {
  try {
    const { vacancyType } = req.params;
    const blueprint = await FormBlueprint.findOne({ vacancyType });
    if (!blueprint) {
      return res.status(404).json({ message: 'Blueprint not found' });
    }
    res.status(200).json(blueprint);
  } catch (err) {
    res.status(500).json({ error: 'Fetch failed', details: err.message });
  }
};

// DELETE blueprint by vacancyType
export const deleteBlueprint = async (req, res) => {
  try {
    const { vacancyType } = req.params;
    const deleted = await FormBlueprint.findOneAndDelete({ vacancyType });
    if (!deleted) {
      return res.status(404).json({ message: 'No blueprint to delete' });
    }
    res.status(200).json({ message: 'Blueprint deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Delete failed', details: err.message });
  }
};
