const express = require('express');
const router = express.Router();
const db = require('../db');
const uuid = require('uuid');
router.route('/testimonials').get((req, res, next) => {
  res.json(db.testimonials);
});

router.route('/testimonials/:id').get((req, res, next) => {
  const id = req.params.id;
  let result;
  if (id === 'random') {
    let index = Math.floor(Math.random() * db.testimonials.length);
    result = db.testimonials[index];
  } else {
    result = db.testimonials.filter((element) => {
      return element.id === id;
    });
  }
  res.json(result);
});

router.route('/testimonials').post((req, res, next) => {
  randomId = uuid.v4();
  db.testimonials.push({
    id: randomId,
    author: req.body.author,
    text: req.body.text,
  });
  res.json({message: 'OK'});
});

router.route('/testimonials/:id').put((req, res, next) => {
  const id = req.params.id;
  db.testimonials.map((element) => {
    if (element.id === id) {
      element.author = req.body.author;
      element.text = req.body.text;
    }
    return element;
  });
  res.json({message: 'OK'});
});

router.route('/testimonials/:id').delete((req, res, next) => {
  const id = req.params.id;
  const testimonial = db.testimonials.filter((element) => element.id === id);
  const index = db.testimonials.indexOf(testimonial[0]);
  db.testimonials.splice(index, 1);
  res.json({message: 'OK'});
});

module.exports = router;