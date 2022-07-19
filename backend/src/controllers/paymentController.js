function createPayment(req, res) {
  res.status(201).json({
    result: "success",
  });
}

module.exports = {
  createPayment,
};
