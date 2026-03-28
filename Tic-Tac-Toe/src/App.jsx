import { useEffect, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';

function Square({ value, onSquareClick }) {
  const valueStyles =
    value === 'X'
      ? 'text-cyan-300 drop-shadow-[0_0_14px_rgba(34,211,238,0.55)]'
      : value === 'O'
        ? 'text-fuchsia-300 drop-shadow-[0_0_14px_rgba(232,121,249,0.55)]'
        : 'text-slate-300';

  return (
    <button
      className={`h-24 w-24 rounded-2xl border border-white/15 bg-white/5 text-4xl font-black backdrop-blur-sm transition duration-200 hover:scale-[1.03] hover:border-white/30 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/80 sm:h-28 sm:w-28 ${valueStyles}`}
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay, playerXName, playerOName }) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  const isDraw = !winner && squares.every((square) => square !== null);
  const nextPlayerName = xIsNext ? playerXName : playerOName;
  const nextPlayerSymbol = xIsNext ? 'X' : 'O';

  let status;
  if (winner) {
    const winnerName = winner === 'X' ? playerXName : playerOName;
    status = `Winner: ${winnerName} (${winner})`;
  } else if (isDraw) {
    status = 'Draw!';
  } else {
    status = `Next player: ${nextPlayerName} (${nextPlayerSymbol})`;
  }

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-center text-sm font-semibold tracking-wide text-slate-100 shadow-lg shadow-black/20">
        {status}
      </div>
      <div className="grid grid-cols-3 gap-3 rounded-3xl border border-white/10 bg-black/20 p-3 backdrop-blur-md sm:p-4">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </div>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [playerXName, setPlayerXName] = useState('Player 1');
  const [playerOName, setPlayerOName] = useState('Player 2');
  const [lastAnnouncedWinningMove, setLastAnnouncedWinningMove] = useState(null);

  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  const winnerSymbol = calculateWinner(currentSquares);
  const normalizedPlayerXName = playerXName.trim() || 'Player 1';
  const normalizedPlayerOName = playerOName.trim() || 'Player 2';

  useEffect(() => {
    if (!winnerSymbol || lastAnnouncedWinningMove === currentMove) {
      return;
    }

    const winnerName = winnerSymbol === 'X' ? normalizedPlayerXName : normalizedPlayerOName;
    toast.success(`${winnerName} won the game!`, {
      duration: 3000,
    });
    setLastAnnouncedWinningMove(currentMove);
  }, [
    currentMove,
    winnerSymbol,
    normalizedPlayerXName,
    normalizedPlayerOName,
    lastAnnouncedWinningMove,
  ]);

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function handleResetGame() {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
    setLastAnnouncedWinningMove(null);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((_, move) => {
    let description;
    if (move > 0) {
      description = `Go to move #${move}`;
    } else {
      description = 'Go to game start';
    }

    const isCurrent = move === currentMove;

    return (
      <li key={move}>
        <button
          className={`w-full rounded-lg border px-3 py-2 text-left text-sm transition ${
            isCurrent
              ? 'border-cyan-300/80 bg-cyan-300/20 text-cyan-100'
              : 'border-white/15 bg-white/5 text-slate-200 hover:border-white/30 hover:bg-white/10'
          }`}
          onClick={() => jumpTo(move)}
        >
          {description}
        </button>
      </li>
    );
  });

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 px-4 py-10 sm:px-8">
      <div className="pointer-events-none absolute -left-16 top-8 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-8 h-80 w-80 rounded-full bg-fuchsia-500/20 blur-3xl" />

      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: '#0f172a',
            color: '#f1f5f9',
            border: '1px solid rgba(148, 163, 184, 0.3)',
          },
        }}
      />

      <div className="relative mx-auto grid w-full max-w-6xl gap-6 lg:grid-cols-[1.3fr_0.7fr]">
        <section className="rounded-3xl border border-white/15 bg-gradient-to-b from-white/10 to-white/5 p-5 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-7">
          <div className="mb-6 flex flex-col gap-2 text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-300">Tic Tac Toe</p>
            <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl">XO Arena</h1>
            <p className="text-sm text-slate-300">Enter player names and battle for three in a row.</p>
          </div>

          <div className="mb-6 grid gap-3 sm:grid-cols-2">
            <label className="text-left text-xs font-semibold uppercase tracking-wide text-slate-300">
              Player X Name
              <input
                type="text"
                value={playerXName}
                onChange={(event) => setPlayerXName(event.target.value)}
                placeholder="Player 1"
                className="mt-2 w-full rounded-xl border border-white/15 bg-slate-900/70 px-3 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-cyan-300/70 focus:ring-2 focus:ring-cyan-300/30"
              />
            </label>
            <label className="text-left text-xs font-semibold uppercase tracking-wide text-slate-300">
              Player O Name
              <input
                type="text"
                value={playerOName}
                onChange={(event) => setPlayerOName(event.target.value)}
                placeholder="Player 2"
                className="mt-2 w-full rounded-xl border border-white/15 bg-slate-900/70 px-3 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-fuchsia-300/70 focus:ring-2 focus:ring-fuchsia-300/30"
              />
            </label>
          </div>

          <div className="mb-6 flex justify-end">
            <button
              className="rounded-xl border border-amber-300/40 bg-amber-300/20 px-4 py-2 text-sm font-semibold text-amber-100 transition hover:bg-amber-300/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/80"
              onClick={handleResetGame}
            >
              New Game
            </button>
          </div>

          <Board
            xIsNext={xIsNext}
            squares={currentSquares}
            onPlay={handlePlay}
            playerXName={normalizedPlayerXName}
            playerOName={normalizedPlayerOName}
          />
        </section>

        <aside className="rounded-3xl border border-white/15 bg-slate-900/50 p-5 text-left shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-6">
          <h2 className="mb-4 text-lg font-bold text-slate-100">Move History</h2>
          <ol className="grid max-h-[520px] gap-2 overflow-auto pr-1">{moves}</ol>
        </aside>
      </div>
    </main>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
