async function loadData() {
  try {
    const response = await fetch("data.json");
    const data = await response.json();
    
    // Get the last row from the array
    const lastRow = data[data.length - 1];
    
    // Display match information
    document.getElementById("expectedFee").innerText = `$${lastRow.expectedFee.toLocaleString()}`;
    document.getElementById("actualFeeReceived").innerText = `$${lastRow.actualFeeReceived.toLocaleString()}`;
    document.getElementById("difference").innerText = `$${lastRow.difference.toLocaleString()}`;
    document.getElementById("status").innerText = lastRow.status;
  } catch (error) {
    document.getElementById("expectedFee").innerText = "Error loading data";
    console.error("Error:", error);
  }
}

loadData();
