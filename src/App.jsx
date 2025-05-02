import './App.css';
import Header from "./ui/Header";
import PokemonList from "./features/pokemon/components/PokemonList";
import { PokemonProvider } from './features/pokemon/context/PokemonContext';
import { FavoritesContextProvider } from './features/pokemon/context/FavoritesContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PokemonDetail from "./features/pokemon/components/PokemonDetail"
import Favorites from './features/pokemon/components/Favorites';
import Compare from './features/pokemon/components/Compare';
import ErrorBoundary from "./ui/ErrorBoundary"

function App() {

  return (
    <div className="min-h-screen bg-[#EEDDC9] p-4 text-[#3e3e3e]">
      <Header />
      <PokemonProvider>
      <FavoritesContextProvider>
      <ErrorBoundary>
      <Router>
      <Routes>
        <Route path="/" element={<PokemonList />} />
        <Route path="/pokemon/:id" element={<PokemonDetail />} />
        <Route path='/favorites' element={<Favorites />} />
        <Route path="/compare" element={<Compare />} />
      </Routes>
    </Router>
    </ErrorBoundary>
    </FavoritesContextProvider>
      </PokemonProvider>
    </div>
  );
}

export default App;
