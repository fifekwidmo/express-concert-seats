const Concert = require('../models/concert.model');
const uuid = require('uuid');

exports.getAll = async (req, res) => {
  try {
    const concertEvent = await Concert.find();
    res.json(concertEvent);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getId = async (req, res, next) => {
  try {
    const concertEvent = await Concert.findById(req.params.id);
    if (concertEvent) {
      res.json(concertEvent);
    } else {
      res.json({ message: 'Failed' });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.postOne = async (req, res) => {
  try {
    if ( req.body.performer && req.body.genre && req.body.price && req.body.day && req.body.image) {
      const newPost = new Concert({
        performer: req.body.performer,
        genre: req.body.genre,
        price: req.body.price,
        day: req.body.day,
        image: req.body.image,
      });
      await newPost.save();
      res.json({ message: 'OK' });
    } else {
      res.json({ message: 'Failed' });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.putId = async (req, res) => {
  try {
    const concertEvent = await Concert.findById(req.params.id);
    if (
      concertEvent && (req.body.performer || req.body.genre || req.body.price || req.body.day || req.body.image ))
			{
				if (req.body.performer) {
					concertEvent.performer = req.body.performer;
				}
				if (req.body.genre) {
					concertEvent.genre = req.body.genre;
				}
				if (req.body.price) {
					concertEvent.price = req.body.price;
				}
				if (req.body.day) {
					concertEvent.day = req.body.day;
				}
				if (req.body.image) {
					con.image = req.body.image;
				}
      await concertEvent.save();
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
    const concertEvent = await Concert.findById(req.params.id);
    if (concertEvent) {
      await concertEvent.remove();
      res.json({ message: 'OK' });
    } else {
      res.json({ message: 'Failed' });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getPerformer = async (req, res) => {
  try {
    const dep = await Concert.find({performer: req.params.performer});
    if(!dep) res.status(404).json({ message: 'Performer not found' });
    else {res.json(dep)};
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getGenre = async (req, res) => {
  try {
    const dep = await Concert.find({genre: req.params.genre});
    if(!dep) res.status(404).json({ message: 'Genre not found' });
    else {res.json(dep)};
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getDay = async (req, res) => {
  try {
    const dep = await Concert.find({day: req.params.day});
    if(!dep) res.status(404).json({ message: 'Day not found' });
    else {res.json(dep)}; 
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

  exports.getPrice = async (req, res) => {
    try {
      const priceMin = req.params.price_min;
      const priceMax = req.params.price_max;
      const priceMinInt = parseInt(priceMin);
      const priceMaxInt = parseInt(priceMax)
      const dep = await Concert.find({
        price: { 
          $gte: priceMinInt,
          $lte: priceMaxInt
        }
      });
      if(!dep) res.status(404).json({ message: 'Nothing within price bracket' });
      else {res.json(dep)}
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  };