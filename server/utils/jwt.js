import jwt from "jsonwebtoken";

export const signToken = (payload, opts = {}) =>
  jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d", ...opts });

export const verifyToken = (token) => jwt.verify(token, process.env.JWT_SECRET);

export const signRefreshToken = (user) => {
  return jwt.sign(
    {
      sub: user._id,
    },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "7d" }
  );
};
