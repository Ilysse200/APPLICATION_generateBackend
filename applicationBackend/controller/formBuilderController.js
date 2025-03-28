import FormBlueprint from '../models/formBuilderModel.js';

// CREATE form blueprint for a job
export const createFormBlueprint = async (req, res) => {
  try {
    const { jobId, fields } = req.body;
    const blueprint = new FormBlueprint({ jobId, fields });
    await blueprint.save();
    res.status(201).json(blueprint);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create form blueprint', details: err.message });
  }
};

// GET form blueprint by job ID
export const getFormBlueprintByJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const blueprint = await FormBlueprint.findOne({ jobId });
    if (!blueprint) return res.status(404).json({ message: 'No blueprint found for this job' });
    res.status(200).json(blueprint);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch blueprint', details: err.message });
  }
};

// UPDATE blueprint
export const updateFormBlueprint = async (req, res) => {
  try {
    const { jobId } = req.params;
    const updatedBlueprint = await FormBlueprint.findOneAndUpdate(
      { jobId },
      { fields: req.body.fields },
      { new: true, upsert: true }
    );
    res.status(200).json(updatedBlueprint);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update blueprint', details: err.message });
  }
};

// DELETE blueprint by jobId
export const deleteFormBlueprint = async (req, res) => {
  try {
    const { jobId } = req.params;
    const result = await FormBlueprint.findOneAndDelete({ jobId });
    if (!result) return res.status(404).json({ message: 'No blueprint to delete' });
    res.status(200).json({ message: 'Blueprint deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete blueprint', details: err.message });
  }
};
export const displayFormsBuilder=async (req, res) => {
  try{
    const result = await FormBlueprint.findOne();
    if (!result) return res.status(404).json({ message: 'No blueprint to display' });
    res.status(200).json( result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to display blueprints', details: err.message });
  }

}
