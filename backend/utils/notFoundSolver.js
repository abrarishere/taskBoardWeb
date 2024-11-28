const notFoundSolver = (req, res, data) => {
  if (!data) {
    const route = req.route?.path || "resource";
    return res.status(404).send({
      message: `The requested ${route} was not found.`,
    });
  }
  return data;
};

module.exports = notFoundSolver;
