# Calculator App

A clean and responsive calculator built with **React**, **Vite**, and **Material UI**.

## Features

- Basic arithmetic operations: `+`, `-`, `*`, `/`
- Real-time display updates
- Keyboard support:
	- Numbers `0-9`
	- Operators `+ - * /`
	- `Enter` / `=` to calculate
	- `Backspace` to delete one character
	- `Escape` to clear
- Error handling with visual feedback
- Responsive layout for different screen sizes

## Tech Stack

- React
- Vite
- Material UI (`@mui/material`, `@mui/icons-material`)
- Emotion (`@emotion/react`, `@emotion/styled`)

## Getting Started

### 1) Clone the repository

```bash
git clone https://github.com/<your-username>/<your-repo-name>.git
cd <your-repo-name>
```

### 2) Install dependencies

```bash
npm install
```

### 3) Run development server

```bash
npm run dev
```

Then open the local URL shown in your terminal (usually `http://localhost:5173`).

## Available Scripts

- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm run preview` — Preview production build locally
- `npm run lint` — Run ESLint

## Project Structure

```text
.
├── public/
├── src/
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

## Push to GitHub

If you haven’t pushed yet:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo-name>.git
git push -u origin main
```

If your repo is already connected:

```bash
git add README.md
git commit -m "Update README"
git push
```

## License

No license file is added yet. You can add one (for example, MIT) before publishing.
