const mongoose = require('mongoose');

//  rentSchema
const rentSchema = new mongoose.Schema({

    bookName: {
        type: String,
    },

    author: String,

    libraryId: {
        type: String,

    },
    name: {
        type: String,

    },
    contactNumber: {
        type: String,

    }


});


const Rent = mongoose.model('rents', rentSchema);

module.exports = Rent;