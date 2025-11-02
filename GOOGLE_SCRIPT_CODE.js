// Google Apps Script Code for GADGET 360 Email Submissions
// Copy and paste this code into Google Apps Script
// Your Sheet ID: 1fVXUHV_921-h64jsi38DxIeUHvvcZzpwnTF_YsUiRqI
// Sheet name: EARLY_ACCESS_GADGET360 (or Sheet1 if different)

function doPost(e) {
  try {
    // Your Google Sheet ID
    const SHEET_ID = '1fVXUHV_921-h64jsi38DxIeUHvvcZzpwnTF_YsUiRqI';
    
    // Open the specific spreadsheet
    const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
    
    // Get the active sheet (or specify sheet name: spreadsheet.getSheetByName('EARLY_ACCESS_GADGET360'))
    const sheet = spreadsheet.getActiveSheet();
    
    // Parse the incoming data - handle both JSON and form data
    let email, timestamp;
    
    if (e.postData && e.postData.contents) {
      try {
        // Try JSON first
        const data = JSON.parse(e.postData.contents);
        email = data.email;
        timestamp = data.timestamp || new Date().toISOString();
      } catch (jsonError) {
        // If JSON fails, try form data
        const params = e.parameter;
        email = params.email;
        timestamp = params.timestamp || new Date().toISOString();
      }
    } else if (e.parameter) {
      // Direct form data
      email = e.parameter.email;
      timestamp = e.parameter.timestamp || new Date().toISOString();
    } else {
      throw new Error('No data received');
    }
    
    // Validate email
    if (!email || !email.includes('@')) {
      return ContentService.createTextOutput(
        JSON.stringify({ success: false, error: 'Invalid email' })
      ).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Check if email already exists (optional - prevents duplicates)
    const emailColumn = 1; // Column A
    const lastRow = sheet.getLastRow();
    if (lastRow > 0) {
      const existingEmails = sheet.getRange(2, emailColumn, lastRow - 1, 1).getValues().flat();
      if (existingEmails.includes(email)) {
        return ContentService.createTextOutput(
          JSON.stringify({ success: false, error: 'Email already exists' })
        ).setMimeType(ContentService.MimeType.JSON);
      }
    }
    
    // Append the data to the sheet (email_id column)
    sheet.appendRow([email, timestamp]);
    
    // Return success response
    return ContentService.createTextOutput(
      JSON.stringify({ success: true, message: 'Email saved successfully' })
    ).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // Return error response
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, error: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

// Test function (optional - you can run this to test the script)
function test() {
  const testData = {
    email: 'test@example.com',
    timestamp: new Date().toISOString()
  };
  
  const mockEvent = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };
  
  const result = doPost(mockEvent);
  Logger.log(result.getContent());
}

