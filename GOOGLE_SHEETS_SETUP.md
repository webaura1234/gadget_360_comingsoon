# Google Sheets Integration Setup Guide

This guide will help you set up Google Sheets integration to automatically save email submissions to your Google Sheet.

**Your Sheet URL:** https://docs.google.com/spreadsheets/d/1fVXUHV_921-h64jsi38DxIeUHvvcZzpwnTF_YsUiRqI/edit

## Step 1: Verify Your Google Sheet

✅ Your Google Sheet is already created!
- Sheet ID: `1fVXUHV_921-h64jsi38DxIeUHvvcZzpwnTF_YsUiRqI`
- Header in A1: "email_id" ✅

**Note:** The script will automatically add timestamps in column B.

## Step 2: Create Google Apps Script

1. Open your Google Sheet: https://docs.google.com/spreadsheets/d/1fVXUHV_921-h64jsi38DxIeUHvvcZzpwnTF_YsUiRqI/edit
2. Click on **Extensions** → **Apps Script**
3. Delete any default code and paste the code from `GOOGLE_SCRIPT_CODE.js` file (or copy below):

```javascript
function doPost(e) {
  try {
    // Get the active spreadsheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    const email = data.email;
    const timestamp = data.timestamp || new Date().toISOString();
    
    // Validate email
    if (!email || !email.includes('@')) {
      return ContentService.createTextOutput(
        JSON.stringify({ success: false, error: 'Invalid email' })
      ).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Append the data to the sheet
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

// Test function (optional - you can run this to test)
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
```

3. Click **Save** (💾 icon) or press `Ctrl+S` / `Cmd+S`
4. Give your project a name (e.g., "Email Submission Handler")

## Step 3: Deploy as Web App

1. Click **Deploy** → **New deployment**
2. Click the gear icon ⚙️ next to "Select type" and choose **Web app**
3. Fill in the deployment settings:
   - **Description**: "Email submission handler"
   - **Execute as**: "Me"
   - **Who has access**: "Anyone" (Important: this allows your website to call it)
4. Click **Deploy**
5. Click **Authorize access** (if prompted)
   - Choose your Google account
   - Click **Advanced** → **Go to [Project Name] (unsafe)** if shown
   - Click **Allow**
6. Copy the **Web app URL** - it will look something like:
   ```
   https://script.google.com/macros/s/AKfycbyxxxxxxxxxxxxxxxxxxxxx/exec
   ```

## Step 4: Update Your Code

1. Open `src/pages/EntryPage.jsx`
2. Find this line (around line 369):
   ```javascript
   const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_SCRIPT_URL_HERE'
   ```
3. Replace `YOUR_GOOGLE_SCRIPT_URL_HERE` with your Web app URL from Step 3
4. Save the file

Example:
```javascript
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyxxxxxxxxxxxxxxxxxxxxx/exec'
```

## Step 5: Test

1. Run your React app: `npm run dev`
2. Go to the entry page
3. Submit an email address
4. Check your Google Sheet - you should see the email and timestamp appear!

## Troubleshooting

### Emails not appearing in the sheet?
- Make sure you clicked "Deploy" (not just Save)
- Verify the Web app access is set to "Anyone"
- Check the browser console for any errors
- Try redeploying the script with "New version" selected

### CORS errors?
- The script uses `no-cors` mode, so you won't see response details
- If emails still aren't saving, check the Google Apps Script execution log

### Need to update the script?
1. Make changes in Apps Script
2. Click **Deploy** → **Manage deployments**
3. Click the edit icon (✏️) next to your deployment
4. Select **New version**
5. Click **Deploy**
6. No need to change the URL - it stays the same!

## Security Note

This setup allows anyone with the URL to submit data to your sheet. For production use, consider:
- Adding email validation
- Implementing rate limiting
- Adding a simple authentication token
- Using a backend server instead of direct Google Apps Script calls

