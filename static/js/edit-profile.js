let formData = {
  first_name: "",
  last_name: "",
  phone: "",
  description: "",
};

const PHONE_PATTERN = /^0\d{8,12}$/;

const handleResetClasses = () => {
  $("#firstname").removeClass("is-valid is-invalid");
  $("#lastname").removeClass("is-valid is-invalid");
  $("#phone").removeClass("is-valid is-invalid");
  $("#description").removeClass("is-valid is-invalid");
};

const handleReset = () => {
  formData = {
    first_name: "",
    last_name: "",
    phone: "",
    description: "",
  };
  $("#firstname").val("");
  $("#lastname").val("");
  $("#phone").val("");
  $("#description").val("");
};

$(document).ready(function () {
  $("#firstname").on("input", (e) => {
    formData.first_name = e.target.value;
  });
  $("#lastname").on("input", (e) => {
    formData.last_name = e.target.value;
  });
  $("#phone").on("input", (e) => {
    formData.phone = e.target.value;
  });
  $("#description").on("input", (e) => {
    formData.description = e.target.value;
  });

  $("#formEditProfile").on("submit", async (e) => {
    e.preventDefault();
    const firstNameIsValid =
      VALIDATOR.minLength(formData.first_name, 3) &&
      VALIDATOR.maxLength(formData.first_name, 30);
    const lastNameIsValid =
      VALIDATOR.minLength(formData.last_name, 3) &&
      VALIDATOR.maxLength(formData.last_name, 30);
    const phoneIsValid = VALIDATOR.match(formData.phone, PHONE_PATTERN);
    const descriptionIsValid = VALIDATOR.maxLength(formData.description, 200);

    handleResetClasses();

    $("#firstname").addClass(firstNameIsValid ? "is-valid" : "is-invalid");
    $("#lastname").addClass(lastNameIsValid ? "is-valid" : "is-invalid");
    $("#phone").addClass(phoneIsValid ? "is-valid" : "is-invalid");
    $("#description").addClass(descriptionIsValid ? "is-valid" : "is-invalid");

    if (
      firstNameIsValid &&
      lastNameIsValid &&
      phoneIsValid &&
      descriptionIsValid
    ) {
      $message(
        {
          type: "success",
          message: `
                    <strong>Congratulation!</strong> You successfully edit profile.
                  `,
          duration: 3500,
        },
        () => {
          location.assign("/");
        }
      );
    }
  });

  $("#formEditProfile").on("reset", () => {
    handleResetClasses();
    handleReset();
  });
});
