const { Tasks } = require('../models');

const validateTask = async (task, status) => {
  if (!task || !status) {
    return { type: 'BAD_REQUEST', message: 'Some required fields are missing' };
  }
  const response = await Tasks.findOne({ where: { task } });
  if (response) {
    return { type: 'ALREADY_REGISTERED', message: 'Already exists task with this name' };
  }
  
  return { type: null, message: response };
};

module.exports = {
  validateTask,
};