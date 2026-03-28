# XO Arena - Modern Tic-Tac-Toe

A modern, responsive Tic-Tac-Toe web application built with React, Vite, and Tailwind CSS.

This project includes player name customization, winner toast notifications, move history time travel, and a polished glassmorphism-inspired UI.

## Preview

src/assert/image.png

## Features

- Responsive modern UI built with Tailwind CSS
- Two-player name input (X and O)
- Dynamic status panel for turn, winner, and draw states
- Toast notification when a player wins
- Full move history with jump-to-state functionality
- One-click New Game reset

## Tech Stack

- React 19
- Vite 8
- Tailwind CSS 4
- react-hot-toast

## Project Structure

```text
Tic-Tac-Toe/
	public/
	src/
		assets/
			hero.png
			react.svg
			vite.svg
		App.jsx
		index.css
		main.jsx
	index.html
	package.json
	vite.config.js
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start development server

```bash
npm run dev
```

### 3. Build for production

```bash
npm run build
```

### 4. Preview production build

```bash
npm run preview
```

## Scripts

- `npm run dev` - Start local development server
- `npm run build` - Create production build
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint checks

## Game Rules

1. Player X always starts first.
2. Players take turns placing marks on the 3x3 board.
3. The first player to align 3 marks in a row, column, or diagonal wins.
4. If all 9 squares are filled and no winner exists, the game is a draw.

## Quality Notes

- Winner announcements are handled via toast notifications.
- Move history supports replay and state rollback.
- UI is mobile-friendly and keyboard focus accessible.

## Future Enhancements

- Draw notification toast
- Scoreboard across multiple rounds
- Sound effects and animation for winning combinations
- Optional AI opponent

## License

This project is available for educational and personal use.
