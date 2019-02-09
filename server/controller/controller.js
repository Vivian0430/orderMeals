var cart=require("../models/cart.js");
var formidable=require("formidable");
exports.addCart=function(req,res){
    var form=new formidable.IncomingForm();

    form.parse(req,(err,fields,files)=>{
       // console.log(fields.obj);
       // cart.find({"cartName":fields.obj.cartName},function(err,data){
          
       // })

       cart.insertCart(fields.obj, function(result) {
            console.log(result);
        
       })
})
}



exports.increaseProduct=function(req,res){
   var form=new formidable.IncomingForm();

    form.parse(req,(err,fields,files)=>{
        cart.find({"_id":fields.id},function(err,data){
            //console.log(data);
            console.log("xxx");
            data[0].updateOne({"cartCount":data[0].cartCount+1},function(err,data){});
        })
   })
}

exports.decreaseProduct=function(req,res){
   var form=new formidable.IncomingForm();

    form.parse(req,(err,fields,files)=>{
        cart.find({"_id":fields.id},function(err,data){
            //console.log(data);
            if(data[0].cartCount!==1){
                data[0].updateOne({"cartCount":data[0].cartCount-1},function(err,data){});
            }
            
        })
   })
}



exports.deleteProduct=function(req,res){
    var form=new formidable.IncomingForm();

    form.parse(req,(err,fields,files)=>{
        cart.find({"_id":fields.id},function(err,data){
            //console.log(data);
            data[0].remove();
        })
    })
}
