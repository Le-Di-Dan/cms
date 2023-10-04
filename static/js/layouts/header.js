$(document).ready(function () {
  $("#logoutBtn").click(function () {
    sessionStorage.setItem("isLoggedIn", "0");
    location.assign("/login");
  });
});
