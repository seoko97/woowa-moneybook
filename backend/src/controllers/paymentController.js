function createPayment(req, res) {
  res.status(201).json({
    result: "success",
  });
}

function getPayment(req, res) {
  res.status(200).json({
    result: "success",
  });
}

function deletePayment(req, res) {
  res.status(200).json({
    result: "success",
  });
}

module.exports = {
  createPayment,
  getPayment,
  deletePayment,
};
