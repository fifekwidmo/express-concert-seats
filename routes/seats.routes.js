const express = require('express');
const router = express.Router();
const db = require('../db');
const uuidv4 = require('uuid').v4;
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

router.route('/seats').post((req, res) => { 
  const { day, seat, client, email } = req.body
  const newSeat = {
    id: uuidv4(),
    day: day,
    seat: seat,
    client: client,
    email: email, 
  };
  if (db.seats.some(item => (item.seat === newSeat.seat && item.day === newSeat.day))) {
    res.json({message: 'The slot is already taken...'});
  } else {
    db.seats.push(newSeat);
    req.io.emit('seatsUpdated', db.seats);
    res.json({ message: 'OK' });
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