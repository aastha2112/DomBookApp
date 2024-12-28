let loginForm = document.getElementById("loginForm");
let errorMsg = document.querySelector(".errorMsg");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let userObj = {
    email: loginForm.email.value,
    password: loginForm.password.value,
  };
  if (
    loginForm.email.value == "admin@empher.com" &&
    loginForm.password.value == "empher@123"
  ) {
    window.location.href = "admin.html";
    localStorage.setItem("loginData", JSON.stringify(userObj));

    alert("Logged in as Admin.");
  } else if (
    loginForm.email.value == "user@empher.com" &&
    loginForm.password.value == "user@123"
  ) {
    window.location.href = "books.html";

    localStorage.setItem("loginData", JSON.stringify(userObj));
  } else {
    errorMsg.textContent = "Incorrect Credentials!";
  }
  loginForm.reset();
});
