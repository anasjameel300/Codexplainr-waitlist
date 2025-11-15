/**
 * Google Apps Script for Codexplainr Waitlist
 * 
 * INSTRUCTIONS:
 * 1. Open your Google Sheet "Codexplanr Waitlist"
 * 2. Click on "Extensions" → "Apps Script"
 * 3. Delete any existing code and paste this entire file
 * 4. Click "Save" (floppy disk icon) and give it a name like "Waitlist Handler"
 * 5. Click "Deploy" → "New deployment"
 * 6. Click the gear icon ⚙️ next to "Select type" and choose "Web app"
 * 7. Set the following:
 *    - Description: "Waitlist API"
 *    - Execute as: "Me"
 *    - Who has access: "Anyone" (this is safe because we validate the data)
 * 8. Click "Deploy"
 * 9. Copy the "Web app URL" - you'll need this for your .env.local file
 * 10. Click "Authorize access" and grant permissions
 * 11. Paste the Web app URL into your .env.local file as GOOGLE_APPS_SCRIPT_URL
 */

/**
 * Handle GET requests (for testing the web app URL in browser)
 * This is optional but helpful for verifying the deployment works
 */
function doGet(e) {
  return ContentService.createTextOutput(
    JSON.stringify({ 
      success: true, 
      message: 'Google Apps Script is deployed and ready!',
      note: 'This endpoint accepts POST requests with email, timestamp, and location data.'
    })
  ).setMimeType(ContentService.MimeType.JSON);
}

/**
 * Convert ISO timestamp to Indian Standard Time (IST) format
 * Format: DD/MM/YYYY HH:mm
 * IST is UTC+5:30 (Asia/Kolkata timezone)
 */
function formatToIST(isoTimestamp) {
  try {
    // Parse the ISO timestamp
    const date = new Date(isoTimestamp);
    
    // Use Google Apps Script's Utilities to format in IST timezone
    const formatted = Utilities.formatDate(date, "Asia/Kolkata", "dd/MM/yyyy HH:mm");
    
    return formatted;
  } catch (error) {
    // If parsing fails, return the original timestamp
    Logger.log('Error formatting timestamp: ' + error.toString());
    return isoTimestamp;
  }
}

/**
 * Handle POST requests from the Next.js API
 * This is the main function that saves data to Google Sheets
 */
function doPost(e) {
  try {
    // Check if event object exists
    if (!e || !e.postData || !e.postData.contents) {
      return ContentService.createTextOutput(
        JSON.stringify({ success: false, error: 'Invalid request format' })
      ).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Get the active spreadsheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Parse the incoming JSON data
    const data = JSON.parse(e.postData.contents);
    const email = data.email || '';
    const timestamp = data.timestamp || new Date().toISOString();
    const location = data.location || 'Unknown';
    
    // Validate email
    if (!email || !email.includes('@')) {
      return ContentService.createTextOutput(
        JSON.stringify({ success: false, error: 'Invalid email' })
      ).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Format timestamp to IST (DD/MM/YYYY HH:mm)
    const formattedTimestamp = formatToIST(timestamp);
    
    // Append the data to the sheet
    // Format: [Email, Timestamp (IST), Location]
    sheet.appendRow([email, formattedTimestamp, location]);
    
    // Return success response
    return ContentService.createTextOutput(
      JSON.stringify({ success: true, message: 'Added to waitlist' })
    ).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // Log error and return error response
    Logger.log('Error: ' + error.toString());
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, error: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * TEST FUNCTION - Use this to test the script
 * 
 * IMPORTANT: Do NOT run doPost() directly - it will cause an error!
 * Instead, run this testDoPost() function to test if everything works.
 * 
 * How to test:
 * 1. Select "testDoPost" from the function dropdown at the top
 * 2. Click the "Run" button (▶️)
 * 3. Authorize permissions if prompted
 * 4. Check your Google Sheet - you should see a test entry
 * 5. Check the Execution log (View → Execution log) to see the result
 */
function testDoPost() {
  try {
    const mockEvent = {
      postData: {
        contents: JSON.stringify({
          email: 'test@example.com',
          timestamp: new Date().toISOString(),
          location: 'Test City, Test Country'
        })
      }
    };
    
    const result = doPost(mockEvent);
    const response = result.getContent();
    Logger.log('Test Result: ' + response);
    
    // Also log to see in execution log
    console.log('Test completed successfully! Check your sheet for the test entry.');
    return response;
  } catch (error) {
    Logger.log('Test Error: ' + error.toString());
    console.log('Test failed: ' + error.toString());
    return error.toString();
  }
}

