const { Tasks } = require('../models');
const schema = require('./validationsInputs');

const getAllTasks = async () => {
  const response = await Tasks.findAll();
  if (!response) return { type: 'NOT_FOUND', message: 'Not Found or not exist' };
  return { type: null, message: response };
};

const getTaskById = async (id) => {  
  const response = await Tasks.findOne({ where: { id: id } });
  if (!response) return { type: 'NOT_FOUND', message: 'Not Found or not exist' };

  return { type: null, message: response.image };
};

const setTaskById = async (id, task, status) => {
  const response = await Tasks.findOne({ where: { id: id } });
  if (!response) return { type: 'NOT_FOUND', message: 'Not Found or not exist' };

  const updateStatus = await Tasks.update({'task': task, 'status': status }, { where: { id: id } })
  return { type: null, message: updateStatus }
};

const addTask = async (task, status, image) => {
  const error = await schema.validateTask(task, status);
  if (error.type) return error;

  Tasks.create({ task, status, image })

  return {type: null, message: ''}
};

const deleteTaskById = async (id) => {
  const response = await Tasks.findOne({ where: { id: id } });
  if (!response) return { type: 'NOT_FOUND', message: 'Not Found or not exist' }

  await Tasks.destroy({ where: { id: id } })

  return { type: null, message: '' }
}

module.exports = {
  getAllTasks,
  getTaskById,
  setTaskById,
  addTask,
  deleteTaskById,
};