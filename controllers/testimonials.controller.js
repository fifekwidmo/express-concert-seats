const Testimonial = require('../models/testimonial.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Testimonial.find());
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getRandom = async (req, res) => {
  try {
    const count = await Testimonial.countDocuments();
    const testimonialEvent = await Testimonial.findOne().skip(
      Math.floor(Math.random() * count)
    );
    if (testimonialEvent) {
      res.json(testimonialEvent);
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getId = async (req, res) => {
  try {
    const testimonialEvent = await Testimonial.findById(req.params.id);
    if (testimonialEvent) {
      res.json(testimonialEvent);
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.postOne = async (req, res) => {
  try {
    if (req.body.author && req.body.text) {
      const newPost = new Testimonial({
        author: req.body.author,
        text: req.body.text,
      });
      await newPost.save();
      res.json({ message: 'OK', data: newPost });
    } else {
      res.json({ message: 'Failed' });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.putId = async (req, res) => {
  try {
    const testimonialEvent = await Testimonial.findById(req.params.id);
    if (testimonialEvent && (req.body.author || req.body.text)) {
      if (req.body.author) {
        testimonialEvent.author = req.body.author;
      }
      if (req.body.text) {
        testimonialEvent.text = req.body.text;
      }
      await tes.save();
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
    const testimonialEvent = Testimonial.findById(req.params.id);
    if (testimonialEvent) {
      await testimonialEvent.remove();
      res.json({ message: 'OK' });
    } else {
      res.json({ message: 'Failed' });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};