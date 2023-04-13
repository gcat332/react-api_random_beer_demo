const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

var Schema = mongoose.Schema
//mongoose.connect('mongodb+srv://pcat332:123abc456@demoforlearning.mmsuy20.mongodb.net/?retryWrites=true&w=majority/', function (err){
// mongoose.connect('mongodb://127.0.0.1:27017/', function (err){
//     if (err) throw err;
//     var db = mongoose.connection.db; // <-- This is your MongoDB driver instance.
//     console.log("succeed connect");
// });
mongoose.connect('mongodb://127.0.0.1:27017/mydb', {
  useNewUrlParser: true
});
mongoose.connection.on('error', (err) => {
  console.error('MongoDB error', err);
});

//// Set Schema
const beerSchema = new Schema({
  id: {type :Number, required: true} ,
  uid : {type : String, required: true},
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
 },{
 versionKey: false //here
})

//// Save Item
// name = mongoose.model(collection,schema);
const beer = mongoose.model('beers',beerSchema);
//   var sing = beer({uid : "e83e54ce-bec1-45a4-81c4-68fb9afb61d8",name : "Hercules Double IPA",id : 260,brand: "Pabst Blue Ribbon" , style:"European Amber Lager",hop: "Ultra",yeast: "2001 - Urquell Lager",malts: "Rye malt",ibu:  "88 IBU", alcohol: "7.6%" , blg:"8.3°Blg"});
//   sing.save((err,obj) => {
//     if (err){
//     throw err};
//     console.log("succeed add record");
//     console.log(obj);
//   }) 


//// View Item List
// beer.find({id : 260} ,'id uid name brand style hop yeast malts ibu alcohol blg' , (err,obj) =>{
//   if (err){ throw err};
//   console.log(obj);
// });

//// Random Item List
beer.aggregate([{$sample:{size: 1}},{$project:{ _id:0,id:1,uid:1,name:1,brand:1,style:1,hop:1,yeast:1,malts:1,ibu:1,alcohol:1,blg:1 }}], (err,obj) => {
  if (err){ throw err};
  console.log(obj);
});
