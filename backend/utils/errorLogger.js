const errorLogger = (error, req, res, next) => {
  console.error(error);
  res.status(500).send({
    message: "An error occurred in the " + req.route.path + " route.",
  });
};

module.exports = errorLogger;
