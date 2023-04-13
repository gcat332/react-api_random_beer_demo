import express, { Application, Request, Response } from 'express';
const app: Application = express()
const port = 3000;
app.use(express.json());
const mongoose = require('mongoose');



//// Create Connection
mongoose.connect('mongodb://127.0.0.1:27017/mydb', {useNewUrlParser: true});
mongoose.connection.on('error', (err:any) => {
    console.error('MongoDB error', err);
    console.log("succeed connect");
});

//Get schema
const beer:any = require('./models/beer')


//endpoint1
app.get('/beer/random', async (req:Request, res:Response) => {
    //// Random Item List
        const randomBeer = await beer.aggregate([{ $sample: { size: 1 }},{$project:{ _id:0,id:1,uid:1,name:1,brand:1,style:1,hop:1,yeast:1,malts:1,ibu:1,alcohol:1,blg:1,randomCount:1}}]);
        res.json(randomBeer[0]);
    //// ramdomCount++
        let newCount = randomBeer[0].randomCount+1;
        await beer.findOneAndUpdate( { id:randomBeer[0].id }, {randomCount: newCount})
        res.status(200).end();
});


//endpoint2
app.post('/beer', async (req:Request, res:Response) => {
    //// If get from body*****
    let beerInsert = req.body;
    //// random ID and put into beerInsert
    beerInsert.id = Math.floor((Math.random() * 9999) + 1);
    res.json(beerInsert);
    beerInsert = beer(beerInsert)
    // await beerInsert.validate( (err) => {console.log(err.message);});
    await beerInsert.save((err:any,obj:JSON)=> {
        if (err) {console.log(err.message);}
        else {
        console.log(obj);};
     });
     res.status(200).end();
});

//port listening
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});
