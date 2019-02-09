var mongoose = require("mongoose");
var OrderSchema = new mongoose.Schema({
 	cartCount:Number,
 	cartPath : String,
	cartName : String,  
	cartPrice: String,
	totalPrice: String
 });

OrderSchema.statics.submitOrder = function (json, callback) {

    var order=new Order(json);
    order.save(function(err){
        if (err) {
            callback(-2);  //服务器错误
            return;
        }
        //发回1这个状态
        callback(1);

    });
	
}

var Order = mongoose.model("Order",CartSchema);

module.exports = Order;