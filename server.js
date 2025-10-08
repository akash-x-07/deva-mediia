  // server.js
  const express = require("express");
  const Razorpay = require("razorpay");
  const bodyParser = require("body-parser");
  const cors = require("cors");
  require("dotenv").config();
  const crypto = require("crypto");
  const path = require("path");

  const app = express();
  app.use(cors());
  app.use(bodyParser.json());
  app.use(express.static("public")); // frontend files

  // Razorpay instance
  const razorpay = new Razorpay({
    key_id: process.env.RZP_KEY_ID,
    key_secret: process.env.RZP_KEY_SECRET
  });

  // Create Order API
  app.post("/create-order", async (req, res) => {
    const { amount } = req.body;
    const options = {
      amount: amount, // in paise
      currency: "INR",
      receipt: "rcpt_" + Date.now(),
      payment_capture: 1
    };

    try {
      const order = await razorpay.orders.create(options);
      res.json(order);
    } catch (err) {
      console.error("❌ Error creating order:", err);
      res.status(500).json({ error: "Unable to create order" });
    }
  });

  // Verify Payment & send eBook
  app.post("/verify-payment", (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RZP_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      console.log("✅ Payment verified:", razorpay_payment_id);
      const ebookPath = path.join(__dirname, "ebooks", "TEEN_TO_MILLIONARIE.pdf");
      return res.download(ebookPath, "TEEN_TO_MILLIONARIE.pdf", (err) => {
        if (err) {
          console.error("❌ Error sending eBook:", err);
          res.status(500).json({ status: "failed", message: "Unable to send eBook" });
        }
      });
    } else {
      console.error("❌ Invalid signature");
      res.status(400).json({ status: "failed", message: "Invalid signature" });
    }
  });

  // Start server
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
