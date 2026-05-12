async function loadData() {
  try {
    const response = await fetch("data.json");
    const data = await response.json();
    
    // Calculate total amount
    const total = data.reduce((sum, item) => sum + item.amount, 0);
    
    // Display the total
    document.getElementById("totalAmount").innerText = `$${total.toLocaleString()}`;
  } catch (error) {
    document.getElementById("totalAmount").innerText = "Error loading data";
    console.error("Error:", error);
  }
}

loadData();
