module.exports.create_success_response = (message, data, success = true) => {
  return { success, message, data };
};

module.exports.create_failure_response = (message, data, success = false) => {
  return { success, message, data };
};

module.exports.set_timer = (minutes) => {
  let tempDate = new Date();
  let destoryDate = new Date(tempDate.setMinutes(tempDate.getMinutes() + minutes)).toISOString();
  return destoryDate;
};
