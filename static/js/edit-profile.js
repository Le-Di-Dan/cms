let formData = {
  first_name: "",
  last_name: "",
  phone: "",
  description: "",
};

const phonePattern = /^0\d{8, 12}$/;

const formEditProfile = document.getElementById("formEditProfile");
const inputFirstName = document.getElementById("firstname");
const inputLastName = document.getElementById("lastname");
const inputPhone = document.getElementById("phone");
const inputDescription = document.getElementById("description");

inputFirstName.addEventListener("input", (e) => {
  formData.first_name = e.target.value;
});

inputLastName.addEventListener("input", (e) => {
  formData.last_name = e.target.value;
});

inputPhone.addEventListener("input", (e) => {
  formData.phone = e.target.value;
});

inputDescription.addEventListener("input", (e) => {
  formData.description = e.target.value;
});

formEditProfile.addEventListener("submit", async (e) => {
  e.preventDefault();
  const firstNameIsValid =
    VALIDATOR.minLength(formData.first_name, 3) &&
    VALIDATOR.maxLength(formData.first_name, 30);
  const lastNameIsValid =
    VALIDATOR.minLength(formData.last_name, 3) &&
    VALIDATOR.maxLength(formData.last_name, 30);
  const phoneIsValid = VALIDATOR.match(formData.phone, phonePattern);
  const descriptionIsValid = VALIDATOR.maxLength(formData.description, 200);
  inputFirstName.classList.remove("is-valid", "is-invalid");
  inputLastName.classList.remove("is-valid", "is-invalid");
  inputPhone.classList.remove("is-valid", "is-invalid");
  inputDescription.classList.remove("is-valid", "is-invalid");

  inputFirstName.classList.add(firstNameIsValid ? "is-valid" : "is-invalid");
  inputLastName.classList.add(lastNameIsValid ? "is-valid" : "is-invalid");
  inputPhone.classList.add(phoneIsValid ? "is-valid" : "is-invalid");
  inputDescription.classList.add(inputDescription ? "is-valid" : "is-invalid");

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
                  <strong>Congratulation!</strong> You successfully add new content.
                `,
        duration: 3500,
      },
      () => {
        location.assign("/view-content");
      }
    );
  }
});

formEditProfile.addEventListener("reset", () => {
  inputFirstName.classList.remove("is-valid", "is-invalid");
  inputLastName.classList.remove("is-valid", "is-invalid");
  inputPhone.classList.remove("is-valid", "is-invalid");
  inputDescription.classList.remove("is-valid", "is-invalid");
  formData = {
    first_name: "",
    last_name: "",
    phone: "",
    description: "",
  };
  inputFirstName.value = "";
  inputLastName.value = "";
  inputPhone.value = "";
  inputDescription.value = "";
});
