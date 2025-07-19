# ♟️ Chess Backend API

A backend-only multiplayer chess engine built with **Node.js**, **Express**, **PostgreSQL**, and **Prisma** — supports playing against AI bots (Minimax), and real-time multiplayer via **Socket.IO**. Inspired by the core backend logic of Chess.com.

---

## 🚀 Features

- ✅ User Authentication (JWT + Bcrypt)
- ♟️ Play vs Bot (Minimax Algorithm + [chess.js](https://github.com/jhlywa/chess.js))
- 👥 Real-time Multiplayer Support via Socket.IO
- 🧠 Game Logic & Move Validation (FEN, PGN, legal moves)
- 🗃️ PostgreSQL with Prisma ORM for clean DB relations
- 📜 Tracks move history, player turns, status, and results
- 🧪 Tested with Postman and local clients

---

## 🛠️ Tech Stack

| Layer        | Tech                         |
|-------------|------------------------------|
| Backend      | Node.js, Express.js           |
| Auth         | JWT (Access + Refresh Tokens), Bcrypt |
| Realtime     | Socket.IO                    |
| Database     | PostgreSQL + Prisma ORM       |
| Game Engine  | [chess.js](https://github.com/jhlywa/chess.js) |
| Dev Tools    | Nodemon, Postman             |

---

## 🧠 Minimax Bot

- The bot uses the Minimax algorithm to choose the best move.
- Evaluates all legal moves recursively with depth control.
- Built on top of `chess.js` for move generation and validation.

---

## 🔐 Auth Flow

- Signup → hashed password stored using Bcrypt
- Login → receives access + refresh JWT tokens
- Authenticated requests use HTTP-only cookies

---

## 📡 Multiplayer Flow

1. User creates a game → receives a game code
2. Second user joins via game code
3. Server assigns colors randomly (white/black)
4. Moves are synced using Socket.IO events
5. Game ends on checkmate, draw, or resignation

---


### Auth
```http
POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/logout
POST   /api/bot/play     // Send FEN + depth → returns best move
POST   /api/game/create  // Create new game
POST   /api/game/join    // Join existing game by gameCode
POST   /api/game/move    // Make a move
GET    /api/game/state   // Get game status

🧑‍💻 Author
Nikhil Singh

