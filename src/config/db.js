const mongoose = require('mongoose');
require('dotenv').config();

const conDB = async () => {
    try {
        await mongoose.connect(process.env.DB);
        console.log('Database connected successfully');
    } catch (err) {
        console.error('Database connection error:', err.message);
        process.exit(1);
    }
};

module.exports = { conDB };
