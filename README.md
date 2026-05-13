# Team Passion Finance

A web application that tracks and displays financial contributions for Team Passion matches.

## Overview

This project provides a real-time financial dashboard that shows:
- **Expected Fee**: The anticipated fee amount for matches
- **Actual Fee Received**: The actual amount received
- **Difference**: The variance between expected and actual fees
- **Status**: Whether the actual fee is more or less than expected

## Features

- Real-time data synchronization with Google Sheets
- Clean, responsive web interface
- Automatic data fetching and display
- Supports multiple match records with total calculations

## Project Structure

```
├── index.html      # Main HTML page with the dashboard UI
├── script.js       # JavaScript for fetching and processing data
├── style.css       # Styling for the web application
├── data.json       # Sample data (optional local fallback)
└── README.md       # This file
```

## How to Use

1. Open `index.html` in a web browser
2. The application automatically fetches the latest data from Google Sheets
3. The dashboard displays the most recent match information

## Data Source

The application pulls data from a Google Sheets CSV. Update the `SHEET_URL` in `script.js` to point to your own spreadsheet:

```javascript
const SHEET_URL = "https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/export?format=csv";
```

### Expected CSV Format

The CSV should have the following columns:
- Column 2: Expected Fee
- Column 3: Actual Fee Received
- Column 4: Difference
- Column 5: Status

## Requirements

- Modern web browser with JavaScript enabled
- Internet connection for fetching data from Google Sheets

## Notes

- The application automatically handles number formatting with Indian Rupee currency (₹)
- Thousands are formatted with locale-specific separators
- The app fetches the last non-empty row from the Google Sheets
