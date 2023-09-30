const registerData = {
  username: "",
  email: "",
  password: "",
  rePassword: "",
};

const usernamePattern = /^[a-zA-Z][a-zA-Z0-9\s]{4,49}$/;

const emailPattern =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordPattern = /^[a-zA-Z0-9]{8}$/;

const formRegister = document.getElementById("formRegister");

const inputUsername = document.getElementById("username");
const inputEmail = document.getElementById("email");
const inputPassword = document.getElementById("password");
const inputRePassword = document.getElementById("re_password");

inputUsername.addEventListener("input", (e) => {
  registerData.username = e.target.value;
});

inputEmail.addEventListener("input", (e) => {
  registerData.email = e.target.value;
});

inputPassword.addEventListener("input", (e) => {
  registerData.password = e.target.value;
});

inputRePassword.addEventListener("input", (e) => {
  registerData.rePassword = e.target.value;
});

formRegister.addEventListener("submit", async (e) => {
  e.preventDefault();
  const usernameIsValid = VALIDATOR.match(
    registerData.username,
    usernamePattern
  );
  const emailIsValid = VALIDATOR.match(registerData.email, emailPattern);
  const passwordIsValid = VALIDATOR.match(
    registerData.password,
    passwordPattern
  );
  const rePasswordIsValid =
    registerData.rePassword === registerData.password &&
    VALIDATOR.match(registerData.rePassword, passwordPattern);

  inputUsername.classList.remove("is-valid", "is-invalid");
  inputEmail.classList.remove("is-valid", "is-invalid");
  inputPassword.classList.remove("is-valid", "is-invalid");
  inputRePassword.classList.remove("is-valid", "is-invalid");

  inputUsername.classList.add(usernameIsValid ? "is-valid" : "is-invalid");
  inputEmail.classList.add(emailIsValid ? "is-valid" : "is-invalid");
  inputPassword.classList.add(passwordIsValid ? "is-valid" : "is-invalid");
  inputRePassword.classList.add(rePasswordIsValid ? "is-valid" : "is-invalid");
  try {
    const response = await fetch("http://localhost:3000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerData),
    });
    if (response.ok) {
      $message(
        {
          type: "success",
          message: `
            <strong>Congratulation!</strong> You successfully create a new account.
          `,
          duration: 3500,
        },
        () => location.assign("/login")
      );
    } else {
      $message({
        type: "danger",
        message: `
            <strong>Oops!</strong> Something went wrong.
          `,
        duration: 3500,
      });
    }
  } catch (error) {}
});
