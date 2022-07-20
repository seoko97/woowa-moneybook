function getDetail(req, res) {
  res.status(200).json({
    result: "success",
  });
}

module.exports = {
  getDetail,
};
