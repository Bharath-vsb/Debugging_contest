const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/debugcontest';

mongoose.connect(MONGO_URI, { serverSelectionTimeoutMS: 2000 })
    .then(() => {
        console.log('OK');
        process.exit(0);
    })
    .catch((err) => {
        console.error('FAIL');
        process.exit(1);
    });
