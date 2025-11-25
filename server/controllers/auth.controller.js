import { AuthAppService } from "../services/auth.service.js"

export const AuthController = {
  register: async (req, res) => {
    const out = await AuthAppService.register(req.body)
    res.json(out)
  },
  login: async (req, res) => {
    const out = await AuthAppService.login(req.body)
    res.json(out)
  },
  verify: async (req, res) => {
    const { email, code } = req.body;
    const out = await AuthAppService.verify(email, code)
    res.json(out)
  },
  me: async (req, res, userId) => {
    console.log('kkkkkkkkkkkkkkkkk', req.user, 'jjjjjjj')
    try {
      const authUserId = req.user._id || req.user;
      const user = await AuthAppService.me(authUserId);

      res.json(user);
    } catch (error) {
      console.error('Error in AuthController.me:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
  resend: async (req, res) => {
    const { email } = req.body;
    const user = await AuthAppService.resendVerificationCode(email)
    res.json({ success: true, message: "Verification code sent successfully" })
  },
}
