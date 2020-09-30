const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const testimonialsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');
const socket = require('socket.io');
const mongoose = require('mongoose');
require('dotenv').config()
const helmet = require('helmet');
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(express.static(path.join(__dirname, '/client/build')));
app.use((req, res, next) => {
  req.io = io;
  next();
});

console.log(process.env.MDBUser);
console.log(process.env.MDBPassword);

// mongoose.connect(`mongodb+srv://${process.env.MDBUser}:${process.env.MDBPassword}@cluster0.pbvqf.mongodb.net/NewWaveDB?retryWrites=true&w=majority`, { useNewUrlParser: true,  useUnifiedTopology: true });


const dbURI = process.env.NODE_ENV === 'production' ? `mongodb+srv://${process.env.MDBUser}:${process.env.MDBPassword}@cluster0.pbvqf.mongodb.net/NewWaveDB?retryWrites=true&w=majority` : 'mongodb://localhost:27017/test_DB';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });


const db = mongoose.connection;
db.once('open', () => {
  console.log('Connected to the database');
});
db.on('error', err => console.log('Error ' + err));

//routes
app.use('/api', testimonialsRoutes);
app.use('/api', concertsRoutes);
app.use('/api', seatsRoutes);
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use((req, res, next) => {
  res.status(404).json({ message: 'Not found...' });
})

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});

const io = socket(server);
io.on('connection', (socket) => {
  console.log('New socket!');
});




module.exports = server