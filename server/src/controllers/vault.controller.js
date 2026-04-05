const VaultEntry = require('../models/VaultEntry.model');
const { encrypt, decrypt } = require('../utils/encryption');

const decryptEntry = (doc) => {
  if (doc.encryptedPassword && doc.encryptedPassword.includes(':')) {
    const [iv, encryptedData] = doc.encryptedPassword.split(':');
    try { doc.password = decrypt(iv, encryptedData); } catch { doc.password = ''; }
  }
  delete doc.encryptedPassword;
  return doc;
};

exports.getEntries = async (req, res, next) => {
  try {
    const entries = await VaultEntry.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json(entries.map(e => decryptEntry(e.toObject())));
  } catch (error) {
    next(error);
  }
};

exports.addEntry = async (req, res, next) => {
  try {
    const { appName, siteUrl, username, password, notes } = req.body;

    if (!appName || !appName.trim()) {
      return res.status(400).json({ message: 'App name is required.' });
    }
    if (!password) {
      return res.status(400).json({ message: 'Password is required.' });
    }

    const { iv, encryptedData } = encrypt(password);
    const newEntry = new VaultEntry({
      userId: req.userId,
      appName: appName.trim(),
      siteUrl: siteUrl || '',
      username: username || '',
      encryptedPassword: `${iv}:${encryptedData}`,
      notes: notes || '',
    });

    const saved = await newEntry.save();
    const doc = saved.toObject();
    doc.password = password;
    delete doc.encryptedPassword;

    res.status(201).json(doc);
  } catch (error) {
    next(error);
  }
};

exports.updateEntry = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { appName, siteUrl, username, password, notes } = req.body;

    if (appName !== undefined && !appName.trim()) {
      return res.status(400).json({ message: 'App name cannot be empty.' });
    }

    const entry = await VaultEntry.findOne({ _id: id, userId: req.userId });
    if (!entry) return res.status(404).json({ message: 'Entry not found.' });

    if (appName) entry.appName = appName.trim();
    if (siteUrl !== undefined) entry.siteUrl = siteUrl;
    if (username !== undefined) entry.username = username;
    if (notes !== undefined) entry.notes = notes;
    if (password) {
      const { iv, encryptedData } = encrypt(password);
      entry.encryptedPassword = `${iv}:${encryptedData}`;
    }

    const updated = await entry.save();
    res.json(decryptEntry(updated.toObject()));
  } catch (error) {
    next(error);
  }
};

exports.deleteEntry = async (req, res, next) => {
  try {
    const entry = await VaultEntry.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    if (!entry) return res.status(404).json({ message: 'Entry not found.' });
    res.json({ message: 'Entry deleted successfully.' });
  } catch (error) {
    next(error);
  }
};

exports.searchEntries = async (req, res, next) => {
  try {
    const { q } = req.query;
    if (!q) return exports.getEntries(req, res, next);

    const entries = await VaultEntry.find({
      userId: req.userId,
      $or: [
        { appName: { $regex: q, $options: 'i' } },
        { username: { $regex: q, $options: 'i' } },
      ],
    }).sort({ createdAt: -1 });

    res.json(entries.map(e => decryptEntry(e.toObject())));
  } catch (error) {
    next(error);
  }
};