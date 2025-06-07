const Drive = require('../models/Drive');
const User = require('../models/User');

exports.getDrives = async (req, res) => {
  const drives = await Drive.find().populate('organizer participants');
  res.json(drives);
};

exports.createDrive = async (req, res) => {
  const { name, lat, lng, tools, time } = req.body;
  const drive = new Drive({ name, lat, lng, tools, time, organizer: req.user.id });
  await drive.save();
  res.status(201).json(drive);
};

exports.rsvpDrive = async (req, res) => {
  const drive = await Drive.findById(req.params.id);
  if (!drive.participants.includes(req.user.id)) {
    drive.participants.push(req.user.id);
    await drive.save();

    const user = await User.findById(req.user.id);
    user.drives.push(drive._id);
    await user.save();
  }
  res.json(drive);
};
