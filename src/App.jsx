import './App.css'
import Header from "./ui/Header";
import Loader from "./ui/Loader";
import usePokemonData from "./features/pokemon/hooks/usePokemonData";
import SearchInput from "./features/pokemon/components/SearchInput";
import TypeFilter from "./features/pokemon/components/TypeFilter";
import PokemonList from "./features/pokemon/components/PokemonList";

function App() {
  const {
    filteredList,
    loading,
    error,
    searchTerm,
    selectedType,
    setSearchTerm,
    setSelectedType
  } = usePokemonData();

  if (loading) return <Loader />;

  if (error)
    return (
      <div className="h-screen flex items-center justify-center text-xl font-semibold text-red-500">
        Failed to load data.
      </div>
    );

  return (
    <div className="min-h-screen bg-[#EEDDC9] p-4 text-[#3e3e3e]">
      <Header />
      <div className="mt-6 flex flex-col md:flex-row gap-4 items-center justify-center">
        <SearchInput value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <TypeFilter value={selectedType} onChange={(e) => setSelectedType(e.target.value)} />
      </div>
      <PokemonList pokemons={filteredList} loading={loading} />
    </div>
  );
}

export default App;
