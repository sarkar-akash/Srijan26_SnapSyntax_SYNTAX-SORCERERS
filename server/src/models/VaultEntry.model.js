const mongoose = require('mongoose');

const VaultEntrySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  appName: {
    type: String,
    required: true,
    trim: true
  },
  siteUrl: {
    type: String,
    trim: true
  },
  username: {
    type: String,
    trim: true
  },
  encryptedPassword: {
    type: String,
    required: true
  },
  notes: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('VaultEntry', VaultEntrySchema);