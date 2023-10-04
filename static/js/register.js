const registerData = {
  username: "",
  email: "",
  password: "",
  rePassword: "",
};

const USERNAME_PATTERN = /^[a-zA-Z][a-zA-Z0-9\s]{2,29}$/;

const EMAIL_PATTERN =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_PATTERN = /^[a-zA-Z0-9]{8,30}$/;

const handleResetClasses = () => {
  $("#username").removeClass("is-valid is-invalid");
  $("#email").removeClass("is-valid is-invalid");
  $("#password").removeClass("is-valid is-invalid");
  $("#re_password").removeClass("is-valid is-invalid");
};

$(document).ready(function () {
  $("#username").on("input", (e) => {
    registerData.username = e.target.value;
  });
  $("#email").on("input", (e) => {
    registerData.email = e.target.value;
  });
  $("#password").on("input", (e) => {
    registerData.password = e.target.value;
  });
  $("#re_password").on("input", (e) => {
    registerData.rePassword = e.target.value;
  });

  $("#formRegister").on("submit", async (e) => {
    e.preventDefault();
    const usernameIsValid = VALIDATOR.match(
      registerData.username,
      USERNAME_PATTERN
    );
    const emailIsValid = VALIDATOR.match(registerData.email, EMAIL_PATTERN);
    const passwordIsValid = VALIDATOR.match(
      registerData.password,
      PASSWORD_PATTERN
    );
    const rePasswordIsValid = registerData.rePassword === registerData.password;
    handleResetClasses();

    $("#username").addClass(usernameIsValid ? "is-valid" : "is-invalid");
    $("#email").addClass(emailIsValid ? "is-valid" : "is-invalid");
    $("#password").addClass(passwordIsValid ? "is-valid" : "is-invalid");
    $("#re_password").addClass(rePasswordIsValid ? "is-valid" : "is-invalid");
    if (
      usernameIsValid &&
      emailIsValid &&
      passwordIsValid &&
      rePasswordIsValid
    ) {
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
    }
  });
});
