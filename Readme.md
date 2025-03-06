# Searchify - Real-Time Search Suggestion Interface

**Searchify** is a web application that provides real-time search suggestions from the Zepto API. Built with React, TypeScript, and Tailwind CSS, it offers a responsive, user-friendly interface with performance optimizations and bonus features like dark mode and voice input.

---

## Features

- **Frontend Implementation**:
  - A modern, responsive UI with a search input field and dropdown suggestions.
  - Real-time suggestions fetched as the user types.
  - Keyboard navigation (Arrow Up/Down, Enter) for accessibility.
  - Loading spinner and error messages for immediate feedback.

- **Data Source Integration**:
  - Fetches suggestions from the Zepto API (assumes a proxy or direct integration).

- **Performance Optimizations**:
  - **Debouncing**: Delays API calls by 300ms to reduce unnecessary requests.
  - **Caching**: Stores previous query results in memory to avoid redundant API calls.

- **Bonus Features**:
  - **Dark Mode**: Toggle between light and dark themes.
  - **Voice Input**: Use the Web Speech API for hands-free searching.
  - **TypeScript**: Ensures type safety across the codebase.
  - **Robust Error Handling**: Displays user-friendly error messages for API or voice input failures.
  - **Visual Polish**: Smooth animations and Tailwind CSS styling.

---

## Prerequisites

- **Node.js** (v14+ recommended)
- **npm** (v6+ recommended)
- A modern browser (e.g., Chrome) for voice input support.
- Access to the Zepto API (via a working proxy or direct endpoint).

---

## Project Structure

```
assigment-node/
├── frontend/
├── backend/
├── README.md         # This file
```

---

## Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone https://github.com/garvitx/assigment-node.git
   cd frontend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start the Development Server**
   ```bash
   npm run dev
   ```
   Open your browser to `http://localhost:3000`.
3. **Start the Development Server**
   ```bash
   cd backend
   npm start
   ```
   Your backend is running at `http://localhost:4000`.


#### `package.json` (Example)
```json
{
  "name": "searchify",
  "version": "1.0.0",
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1"
  },
  "devDependencies": {
    "typescript": "^5.3.3",
    "@types/react": "^18.2.55",
    "@types/react-dom": "^18.2.19",
    "tailwindcss": "^3.4.1"
  }
}
```

#### Tailwind Configuration
Ensure `tailwind.config.js` is set up:
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

---

## Usage

1. **Search**: Type in the search bar to see real-time suggestions from the Zepto API.
2. **Keyboard Navigation**: Use Arrow Up/Down to highlight suggestions and Enter to select.
3. **Voice Input**: Click the microphone button (🎙️) to search using your voice (Chrome recommended).
4. **Dark Mode**: Click the sun/moon button (☀️/🌙) to toggle themes.

---

## Fixing API Issues

If the search suggestions stop working:
1. Open your browser’s Developer Tools (F12) and go to the **Network** tab.
2. Visit the Zepto website, type a query in their search bar, and locate the search API request.
3. Right-click the request, select **Copy as cURL**, and note the URL and headers (e.g., `Authorization`, `Content-Type`).
4. Update the `suggestions` api in `backend/server.js` with the new URL and headers.

---

## Design Decisions

- **React with TypeScript**: Chosen for its component-based architecture and type safety, reducing runtime errors.
- **Debouncing**: Implemented with a 300ms delay to optimize API calls, balancing responsiveness and performance.
- **Caching**: Used `useRef` for an in-memory cache, improving performance for repeated queries without external dependencies.
- **Tailwind CSS**: Selected for rapid, responsive styling with built-in dark mode support.
- **Voice Input**: Added via the Web Speech API to enhance accessibility and user experience.

---

## Bonus Points Addressed

- **Visually Appealing UI**: Smooth animations, dark mode, and a polished Tailwind design.
- **Robust Error Handling**: User-friendly messages for API and voice input failures.
- **TypeScript**: Full type safety across the frontend.
- **Performance Enhancements**: Debouncing and caching implemented.
- **Extra Feature**: Voice input adds a unique, accessible touch.

---

## Troubleshooting

- **API Errors**: Follow the "Fixing API Issues" steps to update headers or URL.
- **Voice Input**: Test in Chrome; other browsers may not support the Web Speech API.
- **Styling Issues**: Ensure Tailwind is properly configured and built.

---

## License

This project is unlicensed for educational purposes. Replace with an appropriate license (e.g., MIT) for public use.

