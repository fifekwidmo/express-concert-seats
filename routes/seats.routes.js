const express = require('express');
const router = express.Router();
const seatsController = require('../controllers/seats.controller');
router.get('/seats', seatsController.getAll);
router.get('seats/:id', seatsController.getId);
router.post('/seats', seatsController.postOne);
router.put('seats/:id', seatsController.putId);
router.delete('seats/:id', seatsController.deleteId);
module.exports = router;