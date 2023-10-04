let formData = {
  title: "",
  brief: "",
  content: "",
};

const handleResetClasses = () => {
  $("#title").removeClass("is-invalid is-valid");
  $("#brief").removeClass("is-invalid is-valid");
  $("#content").removeClass("is-invalid is-valid");
};

const handleReset = () => {
  formData = {
    title: "",
    brief: "",
    content: "",
  };
  $("#title").val("");
  $("#brief").val("");
  $("#content").val("");
};

$(document).ready(function () {
  $("#title").on("input", (e) => {
    formData.title = e.target.value;
  });
  $("#brief").on("input", (e) => {
    formData.brief = e.target.value;
  });
  $("#content").on("input", (e) => {
    formData.content = e.target.value;
  });

  $("#formAddContent").on("submit", async (e) => {
    e.preventDefault();

    const titleIsValid =
      VALIDATOR.minLength(formData.title, 10) &&
      VALIDATOR.maxLength(formData.title, 200);
    const briefIsValid =
      VALIDATOR.minLength(formData.brief, 30) &&
      VALIDATOR.maxLength(formData.brief, 150);
    const contentIsValid =
      VALIDATOR.minLength(formData.content, 50) &&
      VALIDATOR.maxLength(formData.content, 1000);

    handleResetClasses();

    $("#title").addClass(titleIsValid ? "is-valid" : "is-invalid");
    $("#brief").addClass(briefIsValid ? "is-valid" : "is-invalid");
    $("#content").addClass(contentIsValid ? "is-valid" : "is-invalid");

    if (titleIsValid && briefIsValid && contentIsValid) {
      try {
        const response = await fetch("http://localhost:3000/content", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        if (response.ok) {
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

  $("#formAddContent").on("reset", () => {
    handleResetClasses();
    handleReset();
  });
});
