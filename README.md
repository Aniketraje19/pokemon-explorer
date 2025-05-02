# 🧩 Pokémon Interactive Data Explorer

A responsive React application built with **Vite** and **Tailwind CSS** that allows users to explore, search, and filter the first 150 Pokémon using data from the [PokeAPI](https://pokeapi.co/). Includes type-based filters, real-time search, and a Pokémon-themed UI.

---

## 🔗 Live Demo

🌐 https://pokemon-explorer-ebon-theta.vercel.app/ 

---

## 🚀 Features

- 🔍 Real-time Pokémon name search
- 🌀 Filter by type (Fire, Water, Grass, etc.)
- 📄 Display Pokémon cards with:
  - Name
  - Image (sprite)
  - Type(s)
  - ID
- 🧠 Loading state with a running Pikachu animation
- ❌ Empty state and error handling
- 🎨 Styled with a Pokémon-themed color palette using Tailwind CSS
- 📱 Fully responsive for mobile and desktop

### Enhanced List View
- 🔍 Real-time Pokémon name search
- 🌀 Filter Pokémon by multiple types (Fire, Water, Grass, etc.) simultaneously
- 📄 Display Pokémon cards with:
  - Name
  - Image (sprite)
  - Type(s)
  - ID
- 📝 Pagination with configurable items per page (10, 20, 50)
- 🔽 Sorting options (by ID, name, alphabetically)

### Detailed View
- 🔍 Detailed information about each Pokémon:
  - All stats (HP, Attack, Defense, etc.)
  - Abilities
  - Moves
  - Evolution chain
- 🧭 Routing to navigate between the list and detailed views

### Favorites System
- 💖 Mark Pokémon as favorites
- 🧑‍🤝‍🧑 Separate view to display favorite Pokémon
- 💾 Persist favorites in `localStorage` so they remain after a page refresh

### Advanced Features
- ⚔️ Comparison tool to compare stats of two Pokémon
- 🎲 "Random Pokémon" button that loads a random Pokémon entry
- 🚫 Error boundaries to prevent the entire app from crashing

---


## 🛠️ Tech Stack

- React (Vite)
- Tailwind CSS
- PokeAPI
- JavaScript (ES6+)
- React Router (for navigation)
- React Context API (for state management)
---


## 📦 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/pokemon-explorer.git
   ```

2. Navigate into the project directory:
   ```bash
   cd pokemon-explorer
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:3000`.

---

