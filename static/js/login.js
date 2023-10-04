const loginData = {
  email: "",
  password: "",
  remember: false,
};

const EMAIL_PATTERN =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_PATTERN = /^[a-zA-Z0-9]{8,30}$/;

const handleResetClasses = () => {
  $("#email").removeClass("is-valid is-invalid");
  $("#password").removeClass("is-valid is-invalid");
};

$(document).ready(function () {
  $("#email").on("input", (e) => {
    loginData.email = e.target.value;
  });
  $("#password").on("input", (e) => {
    loginData.password = e.target.value;
  });

  $("#formLogin").on("submit", async (e) => {
    e.preventDefault();
    const emailIsValid = VALIDATOR.match(loginData.email, EMAIL_PATTERN);
    const passwordIsValid = VALIDATOR.match(
      loginData.password,
      PASSWORD_PATTERN
    );

    handleResetClasses();

    $("#email").addClass(emailIsValid ? "is-valid" : "is-invalid");
    $("#password").addClass(passwordIsValid ? "is-valid" : "is-invalid");
    if (emailIsValid && passwordIsValid) {
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
              sessionStorage.setItem("isLoggedIn", "1");
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
});
