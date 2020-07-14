const mongoose = require('mongoose');
const { DB, DB_DEV, ISDEV } = require('./config');

const URI = ISDEV ? DB_DEV : DB;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });
    console.log(`*** MongoDB connected: ${conn.connection.host} ***`);
  } catch(err) {
    console.error(err.message)
  }
};

module.exports = connectDB;