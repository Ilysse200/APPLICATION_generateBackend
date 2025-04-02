import Department from '../models/departmentsModel.js';

/**
 * @desc Create a new department
 * @route POST /api/departments
 */
export const createDepartment = async (req, res) => {
  try {
    const { name, head, employees, vacancyCategory} = req.body;

    // Check if the department already exists
    const existing = await Department.findOne({ name });
    if (existing) return res.status(400).json({ message: 'Department already exists' });

    const department = new Department({ name, head, employees,vacancyCategory });
    await department.save();

    res.status(201).json(department);
  } catch (error) {
    res.status(500).json({ message: 'Error creating department', error: error.message });
  }
};

/**
 * @desc Get all departments
 * @route GET /api/departments
 */
export const getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.find().sort({ createdAt: -1 });
    res.status(200).json(departments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching departments', error: error.message });
  }
};

/**
 * @desc Get a single department by ID
 * @route GET /api/departments/:id
 */
export const getDepartmentById = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);
    if (!department) return res.status(404).json({ message: 'Department not found' });

    res.status(200).json(department);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching department', error: error.message });
  }
};

/**
 * @desc Update a department
 * @route PUT /api/departments/:id
 */
export const updateDepartment = async (req, res) => {
  try {
    const updated = await Department.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) return res.status(404).json({ message: 'Department not found' });

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Error updating department', error: error.message });
  }
};

/**
 * @desc Delete a department
 * @route DELETE /api/departments/:id
 */
export const deleteDepartment = async (req, res) => {
  try {
    const deleted = await Department.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Department not found' });

    res.status(200).json({ message: 'Department deleted successfully', deleted });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting department', error: error.message });
  }
};
