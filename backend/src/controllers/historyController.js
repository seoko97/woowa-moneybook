function createHistory(req, res) {
  res.status(201).json({
    result: "success",
  });
}

function getHistory(req, res) {
  res.status(200).json({
    result: "success",
  });
}

module.exports = {
  createHistory,
  getHistory,
};
