import nodemailer from "nodemailer"
import crypto from "crypto"

// Simple in-memory OTP store: { email -> { otp, expiresAt } }
const otpStore = new Map();
const OTP_TTL_MS = 10 * 60 * 1000; // 10 minutes

const Verify_OTP = async (req, res) => {
    const { email } = req.params;
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_FROM || "damodara2006@gmail.com",
            pass: process.env.DAMO_GMAIL_PASS,
        },
    });

    // Use crypto.randomInt for secure OTP
    const random = crypto.randomInt(100000, 1000000);

    try {
        const info = await transporter.sendMail({
            from: `"Sakthi Auto register" <${process.env.EMAIL_FROM || 'damodara2006@gmail.com'}>`,
            to: email,
            subject: "Your Sakthi-auto contest OTP",
            html: `Your OTP is <strong>${random}</strong>. It expires in 5 minutes.`,
        });

        // store OTP server-side and do not send it back in the response
        otpStore.set(email, { otp: String(random), expiresAt: Date.now() + OTP_TTL_MS });

        // schedule cleanup
        setTimeout(() => {
            const rec = otpStore.get(email);
            if (rec && rec.expiresAt <= Date.now()) otpStore.delete(email);
        }, OTP_TTL_MS + 1000);

        console.log("OTP email queued", info.messageId);
        return res.status(200).json({ message: 'OTP sent' });
    } catch (err) {
        console.error('OTP send error', err);
        return res.status(500).json({ message: 'Failed to send OTP' });
    }
}

export { Verify_OTP, otpStore }