const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const vaultController = require('../controllers/vault.controller');

// Protect all routes by mounting our authentication JWT verifier
router.use(authMiddleware);

router.get('/', vaultController.getEntries);
router.post('/', vaultController.addEntry);
router.get('/search', vaultController.searchEntries);
router.put('/:id', vaultController.updateEntry);
router.delete('/:id', vaultController.deleteEntry);

module.exports = router;