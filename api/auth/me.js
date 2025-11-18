import { AuthController } from "../../server/controllers/auth.controller.js"
import { verifyAuth } from "../../server/middleware/auth.js"


export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" })
  }

  const userId = verifyAuth(req, res, null)
  if (!userId) return 

  await AuthController.me(req, res, userId)
}
