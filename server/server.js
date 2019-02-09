var express = require("express");
var formidable = require("formidable");
var path = require("path");
var fs = require("fs");
var request = require("request");
var controller = require("./controller/controller.js");
var product=require("./models/product.js");
var cart=require("./models/cart.js");
//var order=require("./models/order.js");
var app = express();
var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/shalaomao");
mongoose.connection.on('connected',()=>{
  console.log('MongoDB connected success!');
});
mongoose.connection.on('error',(err)=>{
  console.log('MongoDB connected fail!');
});
mongoose.connection.on('dis',()=>{
  console.log('MongoDB disconnected !');
});

// app.get("/upload",(req,res)=>{
//     var form = new formidable.IncomingForm();     
//     let uploadDir = path.join(__dirname,"/upload/");
//     form.uploadDir = uploadDir;
//     form.parse(req,(err,fields,files)=>{
//     	let oldPath = files.cover.path;
//         let newPath = path.join(path.dirname(oldPath), files.cover.name);
//         console.log(newPath);

//         fs.rename(oldPath, newPath, () => {
//             res.json({ code: 1, msg: "", file: files.cover.name });
//         });

//     })
// })
app.get("/product",function(req,res){
   product.find({},function(err,data){
   	 console.log(data);
   	 res.json(data);
   })
});

app.post("/addCart",controller.addCart);

//app.post("/submitOrder",controller.submitOrder);

app.post("/deleteProduct",controller.deleteProduct);

app.post("/increaseProduct",controller.increaseProduct);

app.post("/decreaseProduct",controller.decreaseProduct);

app.get("/cart",function(req,res){
   cart.find({},function(err,data){
   	 console.log(data);
   	 res.json(data);
   })
})

// app.get("/order",function(req,res){
//    order.find({},function(err,data){
//    	 console.log(data);
//    	 res.json(data);
//    })
// })
app.listen(3000);
console.log("start");