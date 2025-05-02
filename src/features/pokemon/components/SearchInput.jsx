import { usePokemonData } from "../hooks/usePokemonData";


export default function SearchInput() {
  const {searchTerm,setSearchTerm} = usePokemonData()
    return (
      <input
        type="text"
        placeholder="Search Pokémon..."
        value={searchTerm}
        onChange={(e)=>setSearchTerm(e.target.value)}
        className="p-2 border border-gray-300 rounded-lg w-64 shadow-sm"
      />
    );
  }
  