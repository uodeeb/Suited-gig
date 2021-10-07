const Order = require("../models/order");
const { verifyToken, verfiyTokenAuthorization, verfiyTokenAdmin } = require("./verifyToken");

const router = require("express").Router();


// CREATE
router.post("/", verifyToken, async (req, res) => {
    const newOrder = new Order(req.body);
    try {
        const saveOrder = await newOrder.save();
        res.status(201).json(saveOrder);
    } catch (err) {
        res.status(500).json(err);
    }
});


//updated
router.put("/:id", verfiyTokenAdmin, async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(updatedOrder);
    } catch (err) {
        res.status(500).json(err);
    }

});

// delete
router.delete("/:id", verfiyTokenAdmin, async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id)
        res.status(200).json("Oreder has been deleted..")
    } catch (err) {
        res.status(500).json(err)
    }
})



// get Users orders
router.get("/find/:userId", verfiyTokenAuthorization, async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.params.userId });

        res.status(200).json(orders);

    } catch (err) {
        res.status(500).json(err)
    }
})

// get all Orders

router.get("/", verfiyTokenAdmin, async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);

    } catch (err) {
        res.status(500).json(err);
    }
})


// GET MONTHLY INCOME

router.get("/income", verfiyTokenAdmin, async (req, res) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

try {
    const income = await Order.aggregate([
        { $match: { createdAt: { $gte: previousMonth } } },
        {
            $project: {
                month: { $month: "$createdAt" },
                sales: "$amount",
            },
        },
        {
            $group: {
                _id: "$month",
                total: { $sum: "$sales" },
            }
        }

    ]);
    res.status(200).json(income)
} catch (err) {
    res.status(500).json(err)
}
});

module.exports = router;