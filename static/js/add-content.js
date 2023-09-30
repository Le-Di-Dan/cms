let formData = {
  title: "",
  brief: "",
  content: "",
};

const formAddContent = document.getElementById("formAddContent");
const inputTitle = document.getElementById("title");
const inputBrief = document.getElementById("brief");
const inputContent = document.getElementById("content");

inputTitle.addEventListener("input", (e) => {
  formData.title = e.target.value;
});

inputBrief.addEventListener("input", (e) => {
  formData.brief = e.target.value;
});

inputContent.addEventListener("input", (e) => {
  formData.content = e.target.value;
});

formAddContent.addEventListener("submit", async (e) => {
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

  inputTitle.classList.remove("is-valid", "is-invalid");
  inputBrief.classList.remove("is-valid", "is-invalid");
  inputContent.classList.remove("is-valid", "is-invalid");

  inputTitle.classList.add(titleIsValid ? "is-valid" : "is-invalid");
  inputBrief.classList.add(briefIsValid ? "is-valid" : "is-invalid");
  inputContent.classList.add(contentIsValid ? "is-valid" : "is-invalid");

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
              <strong>Oops!</strong> Something wen wrong.
            `,
          duration: 3500,
        });
      }
    } catch (error) {}
  }
});

formAddContent.addEventListener("reset", () => {
  inputTitle.classList.remove("is-valid", "is-invalid");
  inputBrief.classList.remove("is-valid", "is-invalid");
  inputContent.classList.remove("is-valid", "is-invalid");
  formData = {
    title: "",
    brief: "",
    content: "",
  };
  inputTitle.value = "";
  inputBrief.value = "";
  inputContent.value = "";
});
