$(document).ready(function () {
  let isLoggedIn = sessionStorage.getItem("isLoggedIn") ?? 0;
  isLoggedIn = +isLoggedIn;
  if (location.href.includes("/login") || location.href.includes("/register")) {
    if (isLoggedIn) {
      location.assign("/");
    }
  } else {
    if (isLoggedIn) {
      $("#need-auth").removeClass("auth");
    } else {
      location.assign("/login");
    }
  }
});
