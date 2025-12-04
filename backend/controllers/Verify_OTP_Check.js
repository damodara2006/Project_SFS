import { otpStore } from "./Verify_OTP.js";

const Verify_OTP_Check = (req, res) => {
  const { email, otp } = req.body;
  const record = otpStore.get(email);
  if (!record) return res.status(400).json({ message: 'No OTP found or expired' });
  if (record.expiresAt < Date.now()) {
    otpStore.delete(email);
    return res.status(400).json({ message: 'OTP expired' });
  }
  if (record.otp === String(otp)) {
    otpStore.delete(email);
    return res.status(200).json({ message: 'OTP verified' });
  }
  return res.status(400).json({ message: 'Invalid OTP' });
}

export default Verify_OTP_Check;
