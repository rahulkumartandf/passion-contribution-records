async function loadExcel() {
  const response = await fetch("data.xlsx");
  const arrayBuffer = await response.arrayBuffer();

  const workbook = XLSX.read(arrayBuffer, { type: "array" });
  const sheetName = workbook.SheetNames[0]; // first sheet
  const sheet = workbook.Sheets[sheetName];

  // Convert sheet to JSON
  const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });

  // Render as table
  const table = document.createElement("table");
  table.border = "1";
  data.forEach(row => {
    const tr = document.createElement("tr");
    row.forEach(cell => {
      const td = document.createElement("td");
      td.textContent = cell;
      tr.appendChild(td);
    });
    table.appendChild(tr);
  });

  document.getElementById("excel-data").appendChild(table);
}

loadExcel();
