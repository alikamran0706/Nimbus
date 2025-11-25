import jwt from "jsonwebtoken"

export function verifyAuth(req, res, next) {
  const header = req.headers.authorization;
  const token = header?.startsWith("Bearer ") ? header.slice(7) : undefined;
  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return null;
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // return payload.sub; // This is user ID
    // req.user = payload.sub
    if (!next) {
      return payload.sub
    }
    else {
      req.user = payload.sub;
      req.role = payload.role;
      next();
    }
  } catch (err) {
    res.status(401).json({ message: "Unauthorized" });
    return null;
  }
}

