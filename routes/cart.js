const Cart = require("../models/cart");
const { verifyToken, verfiyTokenAuthorization, verfiyTokenAdmin } = require("./verifyToken");

const router = require("express").Router();


// CREATE
router.post("/", verifyToken, async (req, res) => {
    const newCart = new Cart(req.body);
    try {
        const saveCart = await newCart.save();
        res.status(201).json(saveCart);
    }  catch (err) {
        res.status(500).json(err);
    }
});


//updated
router.put("/:id", verfiyTokenAuthorization, async (req, res) => {
    try {
        const updatedCart = await Cart.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(updatedCart);
    } catch (err) {
        res.status(500).json(err);
    }

});

// delete
router.delete("/:id", verfiyTokenAuthorization, async (req, res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id)
        res.status(200).json("Cart has been deleted..")
    } catch (err) {
        res.status(500).json(err)
    }
})



// get user cart
router.get("/find/:userId", async (req, res) => {
    try {
        const cart = await Cart.findOne({userId: req.params.userId });

        res.status(200).json(cart);

    } catch (err) {
        res.status(500).json(err)
    }
}) 

 // get all users carts

 router.get("/", verfiyTokenAdmin ,async (req, res) => {
     try{
         const carts = await Cart.find();
         res.status(200).json(carts);

     } catch(err){
res.status(500).json(err);
     }
 })


module.exports = router;