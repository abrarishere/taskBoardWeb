const notFoundSolver = (req, res, data) => {
  if (!data) {
    return res.status(404).send({
      message: `No ${req.route.path} found in the database.`,
    });
  }
  return data;
};

module.exports = notFoundSolver;
