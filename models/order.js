const mongoose = require("mongoose");
const { object } = require("webidl-conversions");


const orderSchema = new mongoose.Schema(
    {
        userid: { type: String, required: true, unique: true },
        products: [
            {
                productid: {
                    type: String
                },
                quantity: {
                    type: Number,
                    default: 1
                },
            }
        ],

        amount:{type:Number, required: true},
        adress:{type:Object, required: true},
        status:{type:String, dafaulte:"Pending"},


    },
    { timestamps: true }
);


module.exports = mongoose.model("order", orderSchema);