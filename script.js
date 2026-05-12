async function loadData() {
  try {
    const response = await fetch("data.json");
    const data = await response.json();
    
    // Display match information
    document.getElementById("matchName").innerText = data.matchName;
    document.getElementById("expectedFee").innerText = `$${data.expectedFee.toLocaleString()}`;
    document.getElementById("actualFeeReceived").innerText = `$${data.actualFeeReceived.toLocaleString()}`;
    document.getElementById("difference").innerText = `$${data.difference.toLocaleString()}`;
    document.getElementById("status").innerText = data.status;
  } catch (error) {
    document.getElementById("matchName").innerText = "Error loading data";
    console.error("Error:", error);
  }
}

loadData();
