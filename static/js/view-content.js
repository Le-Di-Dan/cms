let innerHtml = `<div class="content__heading">View Content</div>
<div class="tableWrapper">
  <h3 class="tableWrapper__heading">View Content List</h3>
  <div class="tableWrapper__body">
    <table class="tableWrapper__table container-fluid">
      <thead class="container-fluid">
        <tr class="d-flex">
          <th class="font-weight-bold d-flex justify-content-center">
            #
          </th>
          <th
            class="font-weight-bold d-flex justify-content-start align-items-center"
          >
            Title
          </th>
          <th
            class="font-weight-bold d-flex justify-content-start align-items-center"
          >
            Brief
          </th>
          <th
            class="font-weight-bold d-flex justify-content-start align-items-center"
          >
            Created On
          </th>
        </tr>
      </thead>
      <tbody>
        {{render}}
      </tbody>
    </table>
  </div>
</div>`;

async function loadContent() {
  try {
    const response = await fetch("http://localhost:3000/content");
    if (response.ok) {
      const data = await response.json();
      const contents = data.data;
      const tableContent = contents.reduce((result, content, i) => {
        result += `
        <tr class="d-flex">
        <td>${i + 1}</td>
        <td>${content.title}</td>
        <td>
          ${content.brief}
        </td>
        <td>${content.created_on}</td>
      </tr>`;
        return result;
      }, "");
      innerHtml = innerHtml.replace("{{render}}", tableContent);

      $("#contentPlaceholder").html(innerHtml);
    }
  } catch (error) {}
}

loadContent();
