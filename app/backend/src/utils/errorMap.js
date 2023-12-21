const errorMap = {
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  ALREADY_REGISTERED: 409,
};

const mapError = (type) => errorMap[type] || 500;

module.exports = {
  errorMap,
  mapError,
};