const crypto = require('crypto');

const algorithm = 'aes-256-cbc';

// Helper to reliably construct a 32-byte key regardless of input variations in the environment
const getKey = () => {
  const secret = process.env.JWT_SECRET || 'fallback_secret';
  return crypto.createHash('sha256').update(String(secret)).digest('base64').substring(0, 32);
};

exports.encrypt = (text) => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(getKey()), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
};

exports.decrypt = (iv, encryptedData) => {
  const ivBuffer = Buffer.from(iv, 'hex');
  const encryptedBuffer = Buffer.from(encryptedData, 'hex');
  const decipher = crypto.createDecipheriv(algorithm, Buffer.from(getKey()), ivBuffer);
  let decrypted = decipher.update(encryptedBuffer);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
};