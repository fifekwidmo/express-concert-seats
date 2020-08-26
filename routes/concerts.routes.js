const express = require('express');
const router = express.Router();
const concertsController = require('../controllers/concerts.controller');
router.get('/concerts', concertsController.getAll);
router.get('concerts/:id', concertsController.getId);
router.post('/concerts', concertsController.postOne);
router.put('concerts/:id', concertsController.putId);
router.delete('concerts/:id', concertsController.deleteId);
module.exports = router;