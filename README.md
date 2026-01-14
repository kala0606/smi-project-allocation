# SMI Project Allocation Form

A beautiful, interactive form for students to submit their project preferences for the 8th Semester 2026.

## Features

- **Student Information Collection**: Student ID, Name, and Discipline
- **Dynamic Project Filtering**: Shows only projects eligible for the selected discipline
- **Max 2 Project Selection**: Students can select exactly 2 projects (Choice A and Choice B)
- **Google Sheets Integration**: All submissions saved to a centralized Google Sheet
- **Local Storage Backup**: Data also saved locally as a fallback
- **Excel Export**: Download submissions as an Excel file
- **Admin Panel**: View submission stats and manage data

---

## 🚀 Quick Setup Guide

### Step 1: Set Up Google Sheets (5 minutes)

1. **Create a new Google Sheet**
   - Go to [sheets.google.com](https://sheets.google.com)
   - Create a new spreadsheet named **"SMI Project Preferences 2026"**

2. **Add headers to the first row:**
   ```
   Timestamp | Student_ID | Student_Name | Discipline | Choice_A | Choice_A_Title | Choice_B | Choice_B_Title
   ```

3. **Create the Google Apps Script**
   - Click **Extensions → Apps Script**
   - Delete any existing code
   - Copy all contents from `google-apps-script.js` and paste it
   - Click **Save** (💾)

4. **Deploy as Web App**
   - Click **Deploy → New deployment**
   - Click the gear ⚙️ next to "Select type" → choose **Web app**
   - Set these options:
     - Description: `SMI Project Form Handler`
     - Execute as: `Me`
     - Who has access: `Anyone`
   - Click **Deploy**
   - **Authorize** when prompted (click through any warnings)
   - **Copy the Web App URL** (looks like `https://script.google.com/macros/s/XXXX.../exec`)
   - **IMPORTANT:** Save this URL - you'll need it in the next step!

### Step 2: Configure the Form with Your Google Sheets URL

**⚠️ CRITICAL:** You MUST hardcode your Google Apps Script URL in the form code, or it won't work on students' phones!

1. **Open `index.html` in a text editor**
2. **Find this section** (around line 1066):
   ```javascript
   const DEFAULT_SCRIPT_URL = ''; // <-- PASTE YOUR URL HERE
   ```
3. **Paste your Google Apps Script Web App URL** between the quotes:
   ```javascript
   const DEFAULT_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_ID_HERE/exec';
   ```
4. **Also update the headers in your Google Sheet** to match:
   ```
   Timestamp | MAHE_Roll_No | Name | MAHE_Email | Discipline | Choice_A | Choice_A_Title | Choice_B | Choice_B_Title
   ```

### Step 3: Deploy the Form on GitHub Pages

1. **Create a new repository** on GitHub
   - Go to [github.com/new](https://github.com/new)
   - Name it `smi-project-allocation` (or any name you prefer)
   - Make it **Public**
   - Click **Create repository**

2. **Upload the form file**
   - Click **"uploading an existing file"**
   - Drag and drop `index.html`
   - Click **Commit changes**

3. **Enable GitHub Pages**
   - Go to **Settings → Pages**
   - Under "Source", select **main** branch
   - Click **Save**
   - Wait 1-2 minutes for deployment

4. **Your form is now live at:**
   ```
   https://yourusername.github.io/smi-project-allocation/
   ```

**✅ That's it!** The form is now configured and will automatically save all submissions to your Google Sheet.

**Note:** The Setup button (gear icon) is optional - it only overrides the hardcoded URL for testing. The hardcoded URL in the code is what students will use.

---

## 📱 How to Use

### For Students

1. Open the form URL shared by your instructor
2. Enter your **Student ID** (e.g., SMI24001)
3. Enter your **Full Name**
4. Select your **Discipline** from the dropdown
5. Browse the eligible projects for your discipline
6. **Click on exactly 2 projects** to select them as your preferences
7. Click **Submit Preferences**

### For Admin/Faculty

**⚠️ The admin panel is hidden from students by default!**

**To access admin mode, use ONE of these methods:**

1. **URL Parameter** (Recommended): Add `?admin=true` to your form URL:
   ```
   https://yourusername.github.io/repo-name/?admin=true
   ```

2. **Secret Keyboard Shortcut**: Press `Ctrl+Shift+A` (or `Cmd+Shift+A` on Mac)

3. **Secret Code**: Simply type `admin` on your keyboard while on the page

Once admin mode is enabled:
- The gear icon (⚙️) appears in the bottom right
- Click it to access the admin panel
- View submission statistics
- Click **View Sheet** to open the Google Sheet
- Click **Download Excel** to export data locally
- Click **Setup** to configure Google Sheets integration
- Click **Clear** to remove local data (does not affect Google Sheet)

**Note:** Admin access persists in your browser session, so you won't need to re-enter it until you close the browser.

---

## 📊 Data Collection

### Google Sheets (Primary)
All submissions are sent to your Google Sheet in real-time. Columns:
- Timestamp
- Student_ID
- Student_Name  
- Discipline
- Choice_A (Project ID)
- Choice_A_Title
- Choice_B (Project ID)
- Choice_B_Title

### Local Storage (Backup)
Data is also saved in the browser's localStorage as a backup. Use the **Download Excel** button to export local data.

---

## 🎨 Customization

### Update Projects
Edit the `PROJECTS_MASTER` array in `index.html`:

```javascript
const PROJECTS_MASTER = [
    { 
        id: "Project 01", 
        title: "Project Name", 
        disciplines: ["BSSD", "CAC", "CE", ...] 
    },
    // Add more projects...
];
```

### Update Disciplines
Edit the `<select id="discipline">` dropdown in `index.html` to add/remove disciplines.

### Change Branding
- Update the title in the `<h1 class="logo">` tag
- Modify colors in the `:root` CSS variables
- Change the semester badge text

---

## 🔒 Security Notes

- The Google Apps Script runs with your Google account permissions
- "Anyone" access means anyone with the URL can submit (no login required)
- Consider adding validation in the Apps Script to verify student IDs
- The form prevents duplicate Student IDs (updates existing submission)

---

## 🛠 Troubleshooting

### Submissions not appearing in Google Sheet?
1. Check that the Web App URL is correct
2. Ensure you deployed with "Anyone" access
3. Check the Apps Script execution log for errors

### Form not loading?
1. Clear browser cache
2. Check browser console for JavaScript errors
3. Ensure all files are uploaded correctly

### Projects not filtering?
1. Verify discipline codes match exactly in PROJECTS_MASTER
2. Check for typos in discipline names

---

## 📄 Files Included

| File | Description |
|------|-------------|
| `index.html` | The complete form (HTML, CSS, JavaScript) |
| `google-apps-script.js` | Code to paste into Google Apps Script |
| `README.md` | This documentation file |

---

## 📞 Support

For issues or questions, contact the SMI IT department or create an issue in the GitHub repository.

---

**Made with ❤️ for Srishti Manipal Institute of Art, Design & Technology**
