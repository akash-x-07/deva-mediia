function togglePassword() {
  const passwordInput = document.getElementById("password");
  const toggle = document.querySelector(".toggle-password");
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    toggle.textContent = "🙈";
  } else {
    passwordInput.type = "password";
    toggle.textContent = "👁️";
  }
}

document.getElementById("loginForm").addEventListener("submit", function (e) {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const errorBox = document.getElementById("error");

  if (!email || !password) {
    e.preventDefault(); 
    errorBox.textContent = "Please fill in all fields!";
    errorBox.style.display = "block";
  } else {
    errorBox.style.display = "none";
    alert("Login submitted successfully! You'll be notified on email.");

  }
});
