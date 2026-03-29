document.getElementById("qty").innerText = localStorage.getItem("order_qty");
document.getElementById("total").innerText = localStorage.getItem("order_total");

function getFormData() {
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const address = document.getElementById("address").value;
  const city = document.getElementById("city").value;
  const state = document.getElementById("state").value;
  const pincode = document.getElementById("pincode").value;

  if (!name || !phone || !address || !pincode) {
    alert("Please fill all required fields!");
    return null;
  }

  return { name, phone, address, city, state, pincode };
}

//////////////////////////////////////////////////////////
// 🔥 ONLINE PAYMENT (NO CHANGE)
//////////////////////////////////////////////////////////

function startPayment() {

  const user = getFormData();
  if (!user) return;

  let amount = Number(localStorage.getItem("order_total")) * 100;

  var options = {
    "key": "rzp_live_RQued3FP5TVGu5",
    "amount": amount,
    "currency": "INR",
    "name": "Teen To Millionaire",
    "description": "Book Purchase",
    "handler": function (response){
        alert("Payment Successful!");
        window.location.href = "success.html";
    },
    "prefill": {
        "name": user.name,
        "contact": user.phone
    },
    "theme": {
        "color": "#2563eb"
    }
  };

  var pay = new Razorpay(options);
  pay.open();
}

//////////////////////////////////////////////////////////
// 🚚 COD + WHATSAPP INTEGRATION
//////////////////////////////////////////////////////////

function placeCOD() {

  const user = getFormData();
  if (!user) return;

  const btn = document.querySelector(".btn-cod");

  btn.innerText = "Placing Order...";
  btn.disabled = true;

  const orderData = {
    ...user,
    paymentMethod: "COD",
    amount: localStorage.getItem("order_total"),
    qty: localStorage.getItem("order_qty"),
    orderId: "ORD" + Date.now()
  };

  console.log("COD Order:", orderData);

  // 📲 WhatsApp Message
  let message = `🛒 *New COD Order* %0A
📦 Product: Teen To Millionaire %0A
🔢 Quantity: ${orderData.qty} %0A
💰 Amount: ₹${orderData.amount} %0A
%0A
👤 Name: ${user.name} %0A
📞 Phone: ${user.phone} %0A
📍 Address: ${user.address}, ${user.city}, ${user.state} - ${user.pincode} %0A
%0A
🆔 Order ID: ${orderData.orderId}`;

  // 👉 Apna WhatsApp number daal yaha
  let whatsappNumber = "918726326511";

  setTimeout(() => {

    // WhatsApp open
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");

    alert("🎉 Order Confirmed! WhatsApp sent.");

    window.location.href = "success.html";

  }, 1200);
}
