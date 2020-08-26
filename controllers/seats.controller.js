const Seat = require('../models/seats.model');
const uuidv4 = require('uuid').v4;

exports.getAll = async (req, res) => {
  try {
    const seatEvent = await Seat.find();
    res.json(seatEvent);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getId = async (req, res, next) => {
  try {
    const seatEvent = await Seat.findById(req.params.id);
    if (seatEvent) {
      res.json(seatEvent);
    } else {
      res.json({ message: 'Failed' });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.postOne = async (req, res) => {
  if (req.body.day && req.body.seat && req.body.client && req.body.email) {
    try {
      if (await Seat.findOne({ day: req.body.day, seat: req.body.seat })) {
        res.status(409).json({ message: 'The slot is already taken...' });
      } else {
        const newSeat = new Seat({
          day: req.body.day,
          seat: req.body.seat,
          client: req.body.client,
          email: req.body.email,
        });
        await newSeat.save();
        const seatEvent = await Seat.find();
        req.io.emit('seatsUpdated', seatEvent);
        res.json({ message: 'OK' });
      }
    } catch (err) {
      res.status(500).json({ message: err });
    }
  } else {
    res.json({ message: 'Failed' });
  }
};

exports.putId = async (req, res) => {
  try {
    const seatEvent = await Seat.findById(req.params.id);
    if (
      seatEvent && (req.body.day || req.body.seat || req.body.client || req.body.email)) {
      if (req.body.day) {
        seatEvent.day = req.body.day;
      }
      if (req.body.seat) {
        seatEvent.seat = req.body.seat;
      }
      if (req.body.client) {
        seatEvent.client = req.body.client;
      }
      if (req.body.email) {
        seatEvent.email = req.body.email;
      }
      await seatEvent.save();
      res.json({ message: 'OK' });
    } else {
      res.json({ message: 'Failed' });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.deleteId = async (req, res) => {
  try {
    const seatEvent = await Seat.findById(req.params.id);
    if (seatEvent) {
      seatEvent.remove();
      res.json({ message: 'OK' });
    } else {
      res.json({ message: 'Failed' });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};