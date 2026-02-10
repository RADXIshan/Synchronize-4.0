import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

export const contactTeam = async(req, res) => {
  const { name, email, message, phone } = req.body;

  if (!name?.trim() || !email?.trim() || !message?.trim() || !phone?.trim()) {
    return res.status(400).json({ error: "All fields are required" });
  }

  if (name.trim().length < 3) {
    return res.status(400).json({ error: "Name must be at least 3 characters long" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  // Phone number cleaning and validation
  const cleanedPhone = phone.trim().replace(/\s+/g, ''); // Remove all spaces

  if (cleanedPhone.startsWith('+')) {
      if (cleanedPhone.length > 14 || cleanedPhone.length < 12) { // Allow + and 11-13 digits approx
          return res.status(400).json({ error: "Invalid phone number! With country code, it should be up to 13 characters." });
      }
  } else {
      if (cleanedPhone.length < 10 || cleanedPhone.length > 12) {
          return res.status(400).json({ error: "Invalid phone number! It should be 10 to 12 digits." });
      }
  }

  // Basic regex to ensure only digits and optional leading +
  const phoneRegex = /^(\+\d{1,3})?\d{10,12}$/;
  // Actually, a simpler regex check after length check might be better or just rely on length + digit check
  // Let's use a regex that matches the length requirements roughly
  if (!/^(\+\d+)?\d+$/.test(cleanedPhone)) { 
       return res.status(400).json({ error: "Invalid phone number! Only digits and '+' are allowed." });
  }

  console.log("Received:", { name, email, message });

  const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.APP_PASSWORD,
        },
    });

    const mailOptions = {
        from: {
            name: "Ishan Roy",
            address: process.env.EMAIL
        },
        to: "ishanroy3118107@gmail.com",
        subject: "Sent from Synchronize 4.0 website",
        text: `Name: ${name}\nEmail: ${email}\nPhone: ${cleanedPhone}\nMessage: ${message}`,
    };
    const confirmationMail = {
        from: {
            name: "Ishan Roy",
            address: process.env.EMAIL
        },
        to: req.body.email,
        subject: "Synchronize Query Message Received",
        text: `Hi ${req.body.name},\n\nThank you for reaching out to the Synchronize Team. We will get back to you shortly.`,
    };    

    try {
        await Promise.all([
            transporter.sendMail(mailOptions),
            transporter.sendMail(confirmationMail)
        ]);        
        res.status(200).json({ success: true, message: "Message sent successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to send message" });
    }

  
}