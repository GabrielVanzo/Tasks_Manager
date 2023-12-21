const { tasksService } = require('../services');
const errorMap = require('../utils/errorMap');

const getAllTasks = async (_req, res) => {
  try {
    const { type, message } = await tasksService.getAllTasks();
    if (type) return res.status(errorMap.mapError(type)).json({ message });

    res.status(200).json({ message });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: 'Ocorreu um erro' });
  }
};

const getTaskById = async (_req, res) => {
  const { id } = _req.params;
  try {
    const { type, message } = await tasksService.getTaskById(id);
    if (type) return res.status(errorMap.mapError(type)).json({ message });
    return res.status(200).json(message);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: 'Ocorreu um erro' });
  }
};

const setTaskById = async (_req, res) => {
  const { id } = _req.params;
  const { task, status } = _req.body;
  
  try {
    const { type, message } = await tasksService.setTaskById(id, task, status);
    if (type) return res.status(errorMap.mapError(type)).json({ message });
    return res.status(200).json({ message: 'Successfully Updated' });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: 'Ocorreu um erro' });
  }
};

const addTask = async (_req, res) => {
  const { task, status, image } = _req.body;
  console.log(image);

  try {
    const { type, message } = await tasksService.addTask(task, status, image);
    if (type) return res.status(errorMap.mapError(type)).json({ message });
    return res.status(200).json({ message: 'Successfully Added' });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: 'Ocorreu um erro' });
  }
}

const deleteTaskById = async (_req, res) => {
  const { id } = _req.params;
  try {
    const { type, message } = await tasksService.deleteTaskById(id);
    if (type) return res.status(errorMap.mapError(type)).json({ message });

    res.status(200).json({ message: 'Successfuly Deleted' });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: 'Ocorreu um erro' });
  }
}

module.exports = {
  getAllTasks,
  getTaskById,
  setTaskById,
  addTask,
  deleteTaskById,
};