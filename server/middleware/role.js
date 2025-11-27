import AppError from "../utils/AppError.js";

export const allowRoles = (...roles) => {

  return (req, res, next) => {
    console.log(req.user.role, req.user, req.role)
    if (!req.user || !roles.includes(req.role)) {
      return next(new AppError("You are not allowed to perform this action", 403));
    }
    next();
  };
};
