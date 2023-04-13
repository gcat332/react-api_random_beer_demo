"use strict";
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//// Set Schema
const beerSchema = new Schema({
    id: { type: Number, required: true },
    uid: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    brand: { type: String, required: true },
    style: { type: String, required: true },
    hop: { type: String, required: true },
    yeast: { type: String, required: true },
    malts: { type: String, required: true },
    ibu: { type: String, required: true },
    alcohol: { type: String, required: true },
    blg: { type: String, required: true },
    randomCount: { type: Number, default: 0 }
}, {
    versionKey: false //here
});
//export Schema
module.exports = mongoose.model('beers', beerSchema);
