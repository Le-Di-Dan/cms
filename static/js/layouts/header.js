const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", function () {
  localStorage.setItem("isLoggedIn", "0");
  location.assign("/login");
});
