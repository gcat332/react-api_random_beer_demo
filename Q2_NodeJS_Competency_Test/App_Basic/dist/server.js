"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
const mongoose = require('mongoose');
//// Create Connection
mongoose.connect('mongodb://127.0.0.1:27017/mydb', { useNewUrlParser: true });
mongoose.connection.on('error', (err) => {
    console.error('MongoDB error', err);
    console.log("succeed connect");
});
//Get schema
const beer = require('./models/beer');
//endpoint1
app.get('/beer/random', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //// Random Item List
    const randomBeer = yield beer.aggregate([{ $sample: { size: 1 } }, { $project: { _id: 0, id: 1, uid: 1, name: 1, brand: 1, style: 1, hop: 1, yeast: 1, malts: 1, ibu: 1, alcohol: 1, blg: 1, randomCount: 1 } }]);
    res.json(randomBeer[0]);
    //// ramdomCount++
    let newCount = randomBeer[0].randomCount + 1;
    yield beer.findOneAndUpdate({ id: randomBeer[0].id }, { randomCount: newCount });
    res.status(200).end();
}));
//endpoint2
app.post('/beer', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //// If get from body*****
    let beerInsert = req.body;
    //// random ID and put into beerInsert
    beerInsert.id = Math.floor((Math.random() * 9999) + 1);
    res.json(beerInsert);
    beerInsert = beer(beerInsert);
    // await beerInsert.validate( (err) => {console.log(err.message);});
    yield beerInsert.save((err, obj) => {
        if (err) {
            console.log(err.message);
        }
        else {
            console.log(obj);
        }
        ;
    });
    res.status(200).end();
}));
//port listening
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});
