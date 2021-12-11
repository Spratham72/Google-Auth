module.exports = function (permittedRoles) {
  return function (req, res, next) {
    // first get the user from the req
    user = req.user.user;
    console.log(user)
    console.log(permittedRoles)
    // check if the roles on the user have any of the role in permittedRoles
    isAllowed = false;

    permittedRoles.map((role) => {
      if (user.role==role) {
        isAllowed = true;
      }
    });

    // if not then throw an error
    if (!isAllowed)
      return res.status(401).json({
        status: "failed",
        message: " You are not allowed to access this",
      });

    next();
  };
};