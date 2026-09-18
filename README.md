# 📞 CallDesk - BlackBuck | Click-to-Call Contact Manager

![CallDesk Logo](public/call-desk-black-buck-logo.png)

**CallDesk** is a streamlined, lightweight, high-performance web application designed for outbound call agents, sales representatives, and support teams. It enables seamless contact management, Excel/CSV bulk data import, automatic phone number normalization (with dedicated support for Indian +91 formats), and single-click calling (`tel:` protocol integration).

---

## 🚀 Key Features

- 📥 **Bulk Excel & CSV Data Import**: Easily import `.xlsx`, `.xls`, or `.csv` files. Automatically maps column names like `Name`, `Full Name`, `Phone`, `Mobile`, `Contact Number`, etc.
- 🇮🇳 **Smart Phone Number Normalization**: Automatically formats and normalizes phone numbers into standardized E.164 formats, adding country codes (`+91` for Indian 10-digit mobile numbers) and removing clutter (spaces, dashes, non-numeric characters).
- 📲 **One-Click Dialing (`tel:` link)**: Click any contact's number or the "Call" action button to trigger native dialing on mobile devices or desktop softphone applications (such as Skype, Teams, FaceTime, or default phone clients).
- 📊 **Real-Time Analytics Dashboard**: Live visual stat counters showing:
  - **Total Contacts** imported.
  - **Pending Calls** remaining.
  - **Calls Completed** tracker.
- 🔍 **Instant Search & Filtering**: Fast, client-side real-time filter by contact name or phone number.
- 📄 **Smart Pagination**: Smooth pagination (20 contacts per page) for handling large contact lists without performance degradation.
- 💾 **Local Data Persistence**: Saves contacts automatically to browser `localStorage` so data persists across browser sessions.
- 🎨 **Modern Responsive UI**: Built with React 19, TailwindCSS, and Lucide Icons, providing a clean, accessible layout on mobile, tablet, and desktop screens.

---

## 🛠️ Tech Stack

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Frontend Framework** | [React 19](https://react.dev/) | High-performance component-based UI rendering |
| **Build Tool & Dev Server** | [Vite](https://vitejs.dev/) | Lightning-fast HMR and optimized production bundling |
| **Styling** | [TailwindCSS v4](https://tailwindcss.com/) | Utility-first, responsive design system |
| **Icons** | [Lucide React](https://lucide.dev/) | Modern, crisp SVG iconography |
| **File Parser** | [SheetJS (XLSX)](https://sheetjs.com/) | Client-side Excel & CSV document processing |

---

## 📁 Project Architecture

```
calldesk/
├── public/
│   └── call-desk-black-buck-logo.png    # Primary brand logo & web favicon
├── src/
│   ├── components/
│   │   ├── ContactRow.jsx               # Individual table row with call trigger & status badge
│   │   ├── ContactTable.jsx             # Responsive contact data table container
│   │   ├── EmptyState.jsx               # Empty list placeholder with import action
│   │   ├── Footer.jsx                   # Application footer component
│   │   ├── Header.jsx                   # Top header with brand logo & quick import action
│   │   ├── ImportModal.jsx              # Drag-and-drop file uploader & manual input modal
│   │   ├── Pagination.jsx               # Page controls for paginated list viewing
│   │   └── Stats.jsx                    # Summary counters (Total, Pending, Called)
│   ├── utils/
│   │   ├── fileUtils.js                 # Excel/CSV parser & intelligent column matcher
│   │   └── phoneUtils.js                # Phone validation, E.164 normalization, +91 formatting
│   ├── App.jsx                          # Main application state & local persistence manager
│   ├── index.css                        # Main TailwindCSS styles import
│   └── main.jsx                         # Application entry point
├── index.html                           # HTML template with favicon & meta configuration
├── package.json                         # Project dependencies & npm scripts
└── README.md                            # Comprehensive project documentation
```

---

## 📥 File Format Guide for Imports

CallDesk automatically detects standard spreadsheet headers. Ensure your file contains headers similar to:

| Field | Supported Column Header Names (Case-Insensitive) |
| :--- | :--- |
| **Phone** *(Required)* | `Phone`, `PhoneNumber`, `Mobile`, `MobileNumber`, `Contact`, `ContactNumber`, `Number` |
| **Name** *(Optional)* | `Name`, `FullName`, `CustomerName`, `ContactName` |

*Note: If no name column is provided, CallDesk automatically assigns default sequential names like `Contact 1`, `Contact 2`.*

---

## ⚡ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.0.0 or higher recommended)
- `npm`

### Installation & Local Setup

1. **Navigate to the Directory**:
   ```bash
   cd calldesk
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start Development Server**:
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:5173`.

4. **Build for Production**:
   ```bash
   npm run build
   ```

5. **Preview Production Build**:
   ```bash
   npm run preview
   ```

---

## 💡 How to Use CallDesk

1. **Import Contacts**: Click the **Import** button in the header. Drag & drop an Excel (`.xlsx`, `.xls`) or CSV (`.csv`) file, or paste phone numbers manually.
2. **Review Dashboard**: View imported contacts, search by name/number, and monitor your total vs. called statistics.
3. **Make Calls**: Click on any phone number or press the green **Call** button. Your device's native phone handler will open, and the contact's status will instantly change to **Called** (with a green checkmark badge).
4. **Clear List**: Click **Clear** to remove all stored contacts and start fresh whenever needed.

---

## 📄 License

This project is maintained for CallDesk / BlackBuck. All rights reserved.
