const loginData = {
  email: "",
  password: "",
  remember: false,
};

const emailPattern =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordPattern = /^[a-zA-Z0-9]{8}$/;

const formLogin = document.getElementById("formLogin");
const inputEmail = document.getElementById("email");
const inputPassword = document.getElementById("pwd");
const inputRemember = document.getElementById("remember");

inputEmail.addEventListener("input", (e) => {
  loginData.email = e.target.value;
});

inputPassword.addEventListener("input", (e) => {
  loginData.password = e.target.value;
});

formLogin.addEventListener("submit", async (e) => {
  e.preventDefault();
  const emailIsValid = VALIDATOR.match(loginData.email, emailPattern);
  const passwordIsValid = VALIDATOR.match(loginData.password, passwordPattern);
  inputEmail.setAttribute("data-validate", emailIsValid.toString());
  inputPassword.setAttribute("data-validate", passwordIsValid.toString());
  if (emailIsValid && passwordIsValid) {
    formLogin.classList.add("was-validated");
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });
      if (response.ok) {
        $message(
          {
            type: "success",
            message: `
              <strong>Congratulation!</strong> You successfully log into your account .
            `,
            duration: 3500,
          },
          () => {
            localStorage.setItem("isLoggedIn", "1");
            location.assign("/");
          }
        );
      } else {
        $message({
          type: "danger",
          message: `
              <strong>Oops!</strong> Your login credentials are invalid.
            `,
          duration: 3500,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
});
