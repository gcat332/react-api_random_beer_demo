express = require('express');
const app = express();
app.use(express.json());

const port = 3000;

const mongoose = require('mongoose');
const Schema = mongoose.Schema

//// Create Connection
mongoose.connect('mongodb://127.0.0.1:27017/mydb', {useNewUrlParser: true});
mongoose.connection.on('error', (err) => {
    console.error('MongoDB error', err);
    console.log("succeed connect");
});

//// Set Schema
const beerSchema = new Schema({
    id: {type :Number, required: true} ,
    uid : {type : String, required: true, unique: true},
    name: {type :String, required: true},
    brand: {type :String, required: true},
    style: {type :String, required: true},
    hop: {type :String, required: true},
    yeast: {type :String, required: true},
    malts: {type :String, required: true},
    ibu: {type :String, required: true},
    alcohol: {type :String, required: true},
    blg: {type :String, required: true},
    randomCount: {type :Number , default: 0}
    },{//collection:'beers',
    versionKey: false //here
    })
//// Declare Connection to beers collection
const beer = mongoose.model('beers',beerSchema);

app.get('/beer/random', async (req, res) => {
    //// Random Item List
        const randomBeer = await beer.aggregate([{ $sample: { size: 1 }},{$project:{ _id:0,id:1,uid:1,name:1,brand:1,style:1,hop:1,yeast:1,malts:1,ibu:1,alcohol:1,blg:1,randomCount:1}}]);
        res.json(randomBeer[0]);
    //// ramdomCount++
        let newCount = randomBeer[0].randomCount+1;
        await beer.findOneAndUpdate( { id:randomBeer[0].id }, {randomCount: newCount})
        res.status(200).end();
});

app.post('/beer', async (req, res) => {
        // If get from body*****
        let beerInsert = req.body;

        // If mockData as JSON*****
        // const beerInsert = {
        //     uid: "b72fcca0-0e3c-4af8-957d-140c884a68b7",
        //     brand: "Dos Equis",
        //     name: "Schneider Aventinus",
        //     style: "Light Lager",
        //     hop: "Warrior",
        //     yeast: "1007 - German Ale",
        //     malts: "Caramel",
        //     ibu: "57 IBU",
        //     alcohol: "9.5%",
        //     blg: "8.2°Blg"
        //     };
        beerInsert.id = Math.floor((Math.random() * 9999) + 1);
        res.json(beerInsert);
        beerInsert = beer(beerInsert)
        // await beerInsert.validate( (err) => {console.log(err.message);});
        await beerInsert.save((err,obj)=> {
            if (err) {console.log(err.message);}
            else {
            console.log(obj);};
         });
         res.status(200).end();
});

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});


