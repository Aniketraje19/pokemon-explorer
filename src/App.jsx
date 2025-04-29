import { useState,useEffect } from 'react'
import './App.css'
import Header from './Components/Header'
import Card from './Components/Card'
import SearchFilter from './Components/SearchFilter'
import Loader from './Components/Loader'
import pokeball from "./assets/pokeball.png"

function App() {

  const [pokemonList, setPokemonList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchPokemon() {
      try {

        const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=150");
        const data = await res.json();

        const detailed = await Promise.all(
          data.results.map((p) => fetch(p.url).then((res) => res.json()))
        );

        const formatted = detailed.map((p) => ({
          id: p.id,
          name: p.name,
          image: p.sprites.front_default,
          types: p.types.map((t) => t.type.name),
        }));

        setPokemonList(formatted);
        setFilteredList(formatted);

      } catch (e) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchPokemon();

  }, []);

  useEffect(() => {
    let result = pokemonList;
    if (searchTerm) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (selectedType) {
      result = result.filter((p) => p.types.includes(selectedType));
    }
    setFilteredList(result);
  }, [searchTerm, selectedType, pokemonList]);

  if (loading)
    return (
        <Loader />
    );


  if (error)
    return (
      <div className="h-screen flex items-center justify-center text-xl font-semibold text-red-500">
        Failed to load data.
      </div>
    );

  return (
    <div className="min-h-screen bg-[#EEDDC9] p-4 text-[#3e3e3e]">
      <Header />
      <SearchFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
      />
      {filteredList.length === 0 ? (
        <div className="flex justify-center items-center text-center text-lg mt-10 text-gray-600">
          No Pokémon found.
          <img
        src={pokeball}
          className="w-40 h-40"
        />
          </div>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
          {filteredList.map((p) => (
            <Card key={p.id} pokemon={p} />
          ))}
        </div>
      )}
    </div>
  )
}

export default App
