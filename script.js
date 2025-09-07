async function loadExcel() {
  const response = await fetch("data.xlsx");
  const arrayBuffer = await response.arrayBuffer();

  const workbook = XLSX.read(arrayBuffer, { type: "array" });
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];

  // Read sheet as array of arrays
  const data = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: "" });

  if (data.length === 0) {
    document.getElementById("excel-data").innerText = "No data found!";
    return;
  }

  // Ensure all rows have same number of columns (normalize)
  const maxCols = Math.max(...data.map(r => r.length));
  const normalized = data.map(row => {
    while (row.length < maxCols) row.push(""); // fill empty cells
    return row;
  });

  // Build HTML table
  let table = `<table id="excelTable" class="display"><thead><tr>`;
  normalized[0].forEach(header => {
    table += `<th>${header || "Column"}</th>`;
  });
  table += `</tr></thead><tbody>`;

  normalized.slice(1).forEach(row => {
    table += "<tr>";
    row.forEach(cell => {
      table += `<td>${cell}</td>`;
    });
    table += "</tr>";
  });

  table += "</tbody></table>";

  document.getElementById("excel-data").innerHTML = table;

  // Initialize DataTable
  $("#excelTable").DataTable({
    pageLength: 10,
    responsive: true
  });
}

loadExcel();
