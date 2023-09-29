let isLoggedIn = localStorage.getItem("isLoggedIn") ?? 0;
isLoggedIn = +isLoggedIn;

const AuthWrapper = document.getElementById("need-auth");

if (location.href.includes("/login") || location.href.includes("/register")) {
  if (isLoggedIn) {
    location.assign("/");
  }
} else {
  if (isLoggedIn) {
    AuthWrapper.classList.remove("auth");
  } else {
    location.assign("/login");
  }
}
