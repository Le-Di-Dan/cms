function $message({ message, type, duration }, callback = () => {}) {
  const target = $("#message-box");
  let innerHtml = "";
  switch (type.toLowerCase()) {
    case "success": {
      innerHtml = `
        <div class="alert alert-success">
            ${message}
        </div>
        `;
      break;
    }
    case "info": {
      innerHtml = `
          <div class="alert alert-info">
              ${message}
          </div>
          `;
      break;
    }
    case "warning   ": {
      innerHtml = `
          <div class="alert alert-warning   ">
              ${message}
          </div>
          `;
      break;
    }
    case "danger": {
      innerHtml = `
          <div class="alert alert-danger">
              ${message}
          </div>
          `;
      break;
    }
  }
  target[0].innerHTML = innerHtml;
  console.log(target);
  target.css("animation-duration", `${duration / 1000}s`).addClass("show");
  const timeOut = setTimeout(() => {
    console.log("....");
    target.removeClass("show");
    callback();
    clearTimeout(timeOut);
  }, duration);
}
