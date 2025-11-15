# Google Sheets Waitlist Integration Setup

## Step-by-Step Instructions

### 1. Set Up Google Apps Script

1. Open your Google Sheet: "Codexplanr Waitlist"
2. Click on **Extensions** → **Apps Script**
3. Delete any existing code in the editor
4. Copy the entire contents of `google-apps-script.js` and paste it into the Apps Script editor
5. Click **Save** (💾 icon) and name it "Waitlist Handler"
6. **Optional: Test the script first:**
   - Select `testDoPost` from the function dropdown (top of editor)
   - Click **Run** (▶️)
   - Authorize permissions if prompted
   - Check your sheet - you should see a test entry
   - **Note:** Do NOT try to run `doPost` directly - it will cause an error!
7. Click **Deploy** → **New deployment**
8. Click the gear icon ⚙️ next to "Select type" and choose **Web app**
9. Configure the deployment:
   - **Description**: "Waitlist API"
   - **Execute as**: "Me"
   - **Who has access**: "Anyone" (this is safe because the script validates data)
10. Click **Deploy**
11. **Copy the Web app URL** - it will look like: `https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec`
12. Click **Authorize access** and grant the necessary permissions
13. You may need to click "Deploy" again and select "Manage deployments" → edit → update to get the final URL

### 2. Configure Environment Variables

1. In your project root, create a file named `.env.local` (copy from `.env.example` if needed)
2. Add your Google Apps Script URL:
   ```
   GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
   ```
3. Replace `YOUR_SCRIPT_ID` with the actual ID from your deployment URL

### 3. Test the Integration

1. Start your development server: `npm run dev`
2. Navigate to `/waitlist`
3. Enter an email and submit
4. Check your Google Sheet - you should see the email, timestamp, and location appear in a new row

### 4. Location Detection

The system automatically detects approximate location using IP geolocation:
- Uses `ipapi.co` service (free tier: 1000 requests/day)
- Returns format: "City, Country" or just "Country"
- No user permission required
- Works automatically in the background

### Troubleshooting

**Issue**: "Server configuration error"
- Make sure `.env.local` exists and contains `GOOGLE_APPS_SCRIPT_URL`
- Restart your dev server after adding the environment variable

**Issue**: "Failed to save to waitlist"
- Check that your Google Apps Script is deployed and accessible
- Verify the script URL is correct in `.env.local`
- Check Apps Script execution logs for errors

**Issue**: Location shows "Unknown"
- This is normal for localhost/development
- Location detection works better in production
- Some IPs may not have location data available

**Issue**: Permission errors in Apps Script
- Make sure you clicked "Authorize access" after deployment
- Grant all requested permissions
- Try redeploying if issues persist

### Production Deployment

When deploying to production (Vercel, Netlify, etc.):
1. Add the `GOOGLE_APPS_SCRIPT_URL` environment variable in your hosting platform's settings
2. Redeploy your application
3. Test the waitlist form in production

