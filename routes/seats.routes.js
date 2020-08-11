const express = require('express');
const router = express.Router();
const db = require('../db');
const uuid = require('uuid');
router.route('/seats').get((req, res, next) => {
  res.json(db.seats);
});

router.route('/seats/:id').get((req, res, next) => {
  const id = req.params.id;
  let result;
  if (id === 'random') {
    let index = Math.floor(Math.random() * db.seats.length);
    result = db.seats[index];
  } else {
    result = db.seats.filter((element) => {
      return element.id === id;
    });
  }
  res.json(result);
});

router.route('/seats').post((req, res, next) => {
  let freeSeat = true;
  db.seats.forEach(seat => {
    if ((seat.day === req.body.day) && (seat.seat === req.body.seat)) {
      freeSeat = false;
      res.status(404).json({message: 'The slot is already taken...'});
    }
  });
  if (freeSeat) {
    randomId = uuid.v4();
    db.seats.push({
      id: randomId,
      day: req.body.day,
      seat: req.body.seat,
      client: req.body.client,
      email: req.body.email,
    });
    res.json({message: 'OK'})
  }
});

router.route('/seats/:id').put((req, res, next) => {
  const id = req.params.id;
  db.seats.map((element) => {
    if (element.id === id) {
      element.day = req.body.day;
      element.seat = req.body.seat;
      element.client = req.body.client;
      element.email = req.body.email;
    }
    return element;
  });
  res.json({message: 'OK'});
});

router.route('/seats/:id').delete((req, res, next) => {
  const id = req.params.id;
  const seat = db.seats.filter((element) => element.id === id);
  const index = db.seats.indexOf(seat[0]);
  db.seats.splice(index, 1);
  res.json({message: 'OK'});
});

module.exports = router;