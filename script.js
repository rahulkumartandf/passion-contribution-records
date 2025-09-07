async function loadExcel() {
  const response = await fetch("data.xlsx");
  const arrayBuffer = await response.arrayBuffer();

  const workbook = XLSX.read(arrayBuffer, { type: "array" });
  const sheetName = workbook.SheetNames[0]; // First sheet
  const sheet = workbook.Sheets[sheetName];

  // Convert to JSON (rows & headers)
  const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });

  if (data.length === 0) {
    document.getElementById("excel-data").innerText = "No data found!";
    return;
  }

  // Build HTML table
  let table = `<table id="excelTable" class="display"><thead><tr>`;
  data[0].forEach(header => { table += `<th>${header}</th>`; });
  table += `</tr></thead><tbody>`;

  data.slice(1).forEach(row => {
    table += "<tr>";
    row.forEach(cell => {
      table += `<td>${cell !== undefined ? cell : ""}</td>`;
    });
    table += "</tr>";
  });

  table += "</tbody></table>";

  document.getElementById("excel-data").innerHTML = table;

  // Initialize DataTables
  $("#excelTable").DataTable({
    pageLength: 10,
    responsive: true
  });
}

loadExcel();
