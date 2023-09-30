const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", function () {
  sessionStorage.setItem("isLoggedIn", "0");
  location.assign("/login");
});
