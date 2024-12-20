import express from 'express';
import Password from '../db.js';
import crypto from 'crypto';
import dotenv from 'dotenv';
const router = express.Router();
dotenv.config();

// Secret Key for encryption/decryption
const SECRET_KEY = process.env.SECRET_KEY;

// Ensure SECRET_KEY is of proper length (32 bytes for aes-256-ctr)
const key = crypto.scryptSync(SECRET_KEY, 'salt', 32); // Use a salt for better security
const iv = crypto.randomBytes(16); // Initialization vector for AES encryption

// Encrypt function
const encrypt = (text) => {
  const cipher = crypto.createCipheriv('aes-256-ctr', key, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return iv.toString('hex') + ':' + encrypted; // Prefix IV to the encrypted data
};

// Decrypt function
const decrypt = (text) => {
  const [ivHex, encrypted] = text.split(':');
  const decipher = crypto.createDecipheriv('aes-256-ctr', key, Buffer.from(ivHex, 'hex'));
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
};

// Save password (POST)
router.post('/add', async (req, res) => {

  const { url, username, password } = req.body;

  try {
    const encryptedPassword = encrypt(password);
    const newPassword = new Password({ url, username, password: encryptedPassword });

    await newPassword.save();

    res.status(201).json({ message: 'Password saved successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all passwords (GET)
router.get('/all', async (req, res) => {
  try {
    const passwords = await Password.find();
    const decryptedPasswords = passwords.map((entry) => ({
      id: entry._id,
      url: entry.url,
      username: entry.username,
      password: decrypt(entry.password),
    }));
    res.json(decryptedPasswords);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete password (DELETE)
router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await Password.findByIdAndDelete(id);
    res.status(200).json({ message: 'Password deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Edit password (PUT)
router.put('/edit/:id', async (req, res) => {
  const { id } = req.params;
  const { url, username, password } = req.body;

  try {
    const encryptedPassword = encrypt(password);
    const updatedPassword = await Password.findByIdAndUpdate(
      id,
      { url, username, password: encryptedPassword },
      { new: true }
    );
    res.status(200).json(updatedPassword);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
