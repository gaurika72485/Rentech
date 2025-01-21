const { createRazorpayInstance } = require("../config/razorpay.config");
const crypto = require("crypto");
require("dotenv").config();

const razorpayInstance = createRazorpayInstance();
exports.createOrder = async (req,res) => {

    const {productId , amount} = req.body;

    //checks
    if ( !productId || !amount){
        return res.status(400).json({
            success: false,
            message: "productId is required",
        });
    }

    const options = {
        amount: amount*100,
        currency: "INR",
        receipt: `receipt_order_1`,
    };

    try {
        razorpayInstance.orders.create(options, (err,order) => {
            if (err) {
                return res.status(500).json({
                    success:false,
                    message: "Something went wrong",
                });
            }
            return res.status(200).json(order);
        })

    } catch(error) {
        return res.status(500).json({
            success:false,
            message: "Something went wrong",
        });
    }
};

exports.verifyPayment = async (req,res) => {
    const { order_id, payment_id, signature } = req.body;

    const secret = process.env.RAZORPAY_KEY_SECRET;

    //create hmac object
    const hmac = crypto.createHmac("sha256",secret);
    hmac.update(order_id + "|" + payment_id);

    const generatedSignature = hmac.digest("hex");

    if (generatedSignature === signature) {
        return res.status(200).json({
            success: true,
            message: "Payment verified",
        });
    } else {
        return res.status(400).json({
            success: false,
            message: "Payment not verified",
        })
    }
}