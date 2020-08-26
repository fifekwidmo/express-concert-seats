const express = require('express');
const router = express.Router();
// const db = require('../db');
const concertsController = require('../controllers/concerts.controller');
const uuid = require('uuid');

router.route('/concerts').get((req, res, next) => {
  res.json(db.concerts);
});

router.route('/concerts/:id').get((req, res, next) => {
  const id = req.params.id;
  let result;
  if (id === 'random') {
    let index = Math.floor(Math.random() * db.concerts.length);
    result = db.concerts[index];
  } else {
    result = db.concerts.filter((element) => {
      return element.id === id;
    });
  }
  res.json(result);
});

router.route('/concerts').post((req, res, next) => {
  randomId = uuid.v4();
  db.concerts.push({
    id: randomId,
    performer: req.body.performer,
    genre: req.body.genre,
    price: req.body.price,
    day: req.body.day,
    image: req.body.image,
  });
  res.json({message: 'OK'});
});

router.route('/concerts/:id').put((req, res, next) => {
  const id = req.params.id;
  db.concerts.map((element) => {
    if (element.id === id) {
      element.performer = req.body.performer;
      element.genre = req.body.genre;
      element.price = req.body.price;
      element.day = req.body.day;
      element.image = req.body.image;
    }
    return element;
  });
  res.json({message: 'OK'});
});

router.route('/concerts/:id').delete((req, res, next) => {
  const id = req.params.id;
  const concert = db.concerts.filter((element) => element.id === id);
  const index = db.concerts.indexOf(concert[0]);
  db.concerts.splice(index, 1);
  res.json({message: 'OK'});
});

module.exports = router;