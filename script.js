// Google Sheets link for data sync
const SHEET_URL = "https://docs.google.com/spreadsheets/d/1VEgVucgtLxBD4gbwHyUgKsKz0jJWBVYP/export?format=csv";

async function loadData() {
  try {
    // Fetch CSV from Google Sheets
    const response = await fetch(SHEET_URL);
    const csv = await response.text();
    
    // Parse CSV
    const rows = csv.trim().split('\n').map(row => row.split(','));
    
    // Get the last row (excluding empty rows)
    let lastRow = null;
    for (let i = rows.length - 1; i >= 0; i--) {
      if (rows[i][1] && rows[i][1].trim()) { // Check if Match Name exists
        lastRow = rows[i];
        break;
      }
    }
    
    if (!lastRow) {
      document.getElementById("expectedFee").innerText = "No data found";
      return;
    }
    
    // Extract values (column index: 2=Expected Fee, 3=Actual Fee Received, 4=Difference, 5=Status)
    const expectedFee = parseInt(lastRow[2]) || 0;
    const actualFeeReceived = parseInt(lastRow[3]) || 0;
    const difference = parseInt(lastRow[4]) || 0;
    const status = lastRow[5] ? lastRow[5].trim() : "-";
    
    // Display match information
    document.getElementById("expectedFee").innerText = `₹${expectedFee.toLocaleString()}`;
    document.getElementById("actualFeeReceived").innerText = `₹${actualFeeReceived.toLocaleString()}`;
    document.getElementById("difference").innerText = `₹${difference.toLocaleString()}`;
    document.getElementById("status").innerText = status;
  } catch (error) {
    document.getElementById("expectedFee").innerText = "Error loading data";
    console.error("Error:", error);
  }
}

loadData();
