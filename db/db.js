const mongoose = require('mongoose')
mongoose.connect('mongodb://0.0.0.0/authentication-api', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;

db.on('error', (error) => {
  console.error('Error connecting to the database:', error);
});

db.once('open', () => {
  console.log('Connection successful');
});

module.exports = db;