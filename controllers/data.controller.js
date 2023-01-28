module.exports.getter_controller = (req, res) => {
  return res.status(200).json({ getter: "fine" });
};

module.exports.setter_controller = (req, res) => {
  return res.status(200).json({ setter: "fine" });
};
