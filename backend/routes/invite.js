const express = require('express');
const router = express.Router();
const Invite = require('../models/Invite');
const nodemailer = require('nodemailer');
const isAdmin = require("../middleware/isAdmin");


// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'kalyani_murakonda@srmap.edu.in',        // 👉 Replace with your Gmail
    pass: 'rxrr tvfa hkog deil'           // 👉 Replace with Gmail App Password
  }
});

router.post('/submit', async (req, res) => {
  try {
    const invite = new Invite(req.body);
    await invite.save();

    // Email notification
    const mailOptions = {
      from: 'kalyani_murakonda@srmap.edu.in',
      to: 'kalyani_murakonda@srmap.edu.in',        // 👉 Your notification email
      subject: `New Invite from ${invite.name}`,
      text: `
        Name: ${invite.name}
        Email: ${invite.email}
        Phone: ${invite.phone}
        Institute: ${invite.institute}
        Location: ${invite.location}
        Timestamp: ${invite.timestamp}
      `
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error('Email failed:', err);
        return res.status(500).json({ message: 'Invite saved but email failed' });
      } else {
        console.log('Email sent:', info.response);
        return res.status(200).json({ message: 'Invite saved and email sent' });
      }
    });

  } catch (err) {
    console.error('Error saving invite:', err);
    res.status(500).json({ message: 'Error saving invite' });
  }
});
// routes/invite.js
router.get("/", isAdmin, async (req, res) => {
  try {
    const invites = await Invite.find().sort({ createdAt: -1 });
    res.json(invites);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch invites" });
  }
});


module.exports = router;
