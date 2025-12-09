const steps = document.querySelectorAll(".step");
const qtyEl = document.getElementById("qty");
const summaryPrice = document.getElementById("summary-price");
const confirmQty = document.getElementById("confirm-qty");
const confirmTotal = document.getElementById("confirm-total");

// Navigation buttons
const nextToShipping = document.getElementById("next-to-shipping");
const backToProduct = document.getElementById("back-to-product");
const nextToPayment = document.getElementById("next-to-payment");
const backToShipping = document.getElementById("back-to-shipping");
const placeOrder = document.getElementById("place-order");

// Step navigation function
function goToStep(stepNum) {
  steps.forEach(s => s.classList.remove("active"));
  document.querySelector(`.step-${stepNum}`).classList.add("active");
}

// Update summary
qtyEl.addEventListener("input", () => {
  const qty = Math.max(1, parseInt(qtyEl.value));
  summaryPrice.innerText = "₹" + (qty * 899);
});

// Next / Back buttons
nextToShipping.addEventListener("click", () => goToStep(2));
backToProduct.addEventListener("click", () => goToStep(1));
nextToPayment.addEventListener("click", () => {
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const address = document.getElementById("address").value;
  const pincode = document.getElementById("pincode").value;

  if (!name || !phone || !address || !pincode) {
    alert("Please fill shipping details.");
    return;
  }

  const qty = Math.max(1, parseInt(qtyEl.value));
  confirmQty.innerText = qty;
  confirmTotal.innerText = qty * 899;

  goToStep(3);
});
backToShipping.addEventListener("click", () => goToStep(2));

// Razorpay Payment
placeOrder.addEventListener("click", () => {
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const qty = Math.max(1, parseInt(qtyEl.value));
  const total = qty * 899;

  const options = {
    "key": "rzp_live_RQued3FP5TVGu5",
    "amount": total * 100,
    "currency": "INR",
    "name": "Teen To Millionaire",
    "description": "Book Purchase",
    "handler": function(response) {
      alert("Payment Successful!\nPayment ID: " + response.razorpay_payment_id);
      window.location = "/thankyou.html";
    },
    "prefill": {
      "name": name,
      "contact": phone
    },
    "theme": { "color": "#ff6a00" }
  };
  var pay = new Razorpay(options);
  pay.open();
});



