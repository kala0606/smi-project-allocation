/**
 * SMI Project Allocation - Google Apps Script
 * 
 * SETUP INSTRUCTIONS:
 * 
 * 1. Go to Google Sheets (sheets.google.com) and create a new spreadsheet
 * 2. Name it "SMI Project Preferences 2026"
 * 3. In the first row, add these headers:
 *    Timestamp | MAHE_Roll_No | Name | MAHE_Email | Discipline | Choice_A | Choice_A_Title | Choice_B | Choice_B_Title
 * 
 * 4. Go to Extensions → Apps Script
 * 5. Delete any code in the editor and paste this entire file
 * 6. Click "Deploy" → "New deployment"
 * 7. Click the gear icon next to "Select type" and choose "Web app"
 * 8. Set:
 *    - Description: "SMI Project Form Handler"
 *    - Execute as: "Me"
 *    - Who has access: "Anyone"
 * 9. Click "Deploy"
 * 10. Authorize the app when prompted (click through the warnings)
 * 11. Copy the Web App URL - you'll need this for the form!
 * 
 * The URL looks like: https://script.google.com/macros/s/XXXX.../exec
 */

// Handle POST requests from the form
function doPost(e) {
  try {
    // Get the active spreadsheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Parse the incoming data - handle both JSON and form data
    let data;
    if (e.postData && e.postData.contents) {
      // Try to parse as JSON first
      try {
        data = JSON.parse(e.postData.contents);
      } catch (e) {
        // If JSON fails, try form data
        const formData = e.parameter;
        if (formData && formData.data) {
          data = JSON.parse(formData.data);
        } else {
          throw new Error('Invalid data format');
        }
      }
    } else if (e.parameter && e.parameter.data) {
      // Handle form data
      data = JSON.parse(e.parameter.data);
    } else {
      throw new Error('No data received');
    }
    
    // Create a timestamp
    const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
    
    // Check if student already submitted (optional: update instead of duplicate)
    const existingData = sheet.getDataRange().getValues();
    let rowToUpdate = -1;
    
    for (let i = 1; i < existingData.length; i++) {
      if (existingData[i][1] === data.studentId) {
        rowToUpdate = i + 1; // Sheets are 1-indexed
        break;
      }
    }
    
    const rowData = [
      timestamp,
      data.studentId,
      data.studentName,
      data.studentEmail,
      data.discipline,
      data.choiceA,
      data.choiceATitle,
      data.choiceB,
      data.choiceBTitle
    ];
    
    if (rowToUpdate > 0) {
      // Update existing row
      sheet.getRange(rowToUpdate, 1, 1, rowData.length).setValues([rowData]);
    } else {
      // Append new row
      sheet.appendRow(rowData);
    }
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: true, 
        message: rowToUpdate > 0 ? 'Preferences updated!' : 'Preferences submitted!',
        isUpdate: rowToUpdate > 0
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: false, 
        message: 'Error: ' + error.toString() 
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Handle GET requests (for testing)
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ 
      status: 'ok', 
      message: 'SMI Project Form API is running!' 
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Optional: Function to get all submissions (can be called from the form for admin view)
function getAllSubmissions() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = sheet.getDataRange().getValues();
  
  // Skip header row
  const submissions = data.slice(1).map(row => ({
    timestamp: row[0],
    studentId: row[1],
    studentName: row[2],
    studentEmail: row[3],
    discipline: row[4],
    choiceA: row[5],
    choiceATitle: row[6],
    choiceB: row[7],
    choiceBTitle: row[8]
  }));
  
  return submissions;
}

// Optional: Get submission count
function getSubmissionCount() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const lastRow = sheet.getLastRow();
  return lastRow > 1 ? lastRow - 1 : 0; // Subtract header row
}
