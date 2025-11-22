const Invite = require("../models/Invite");

exports.submitInvite = async (req, res) => {
  try {
    const invite = new Invite(req.body);
    await invite.save();
    res.status(201).json({ message: "Invite submitted successfully" });
  } catch (err) {
    res.status(400).json({ error: "Failed to save invite", details: err.message });
  }
};
