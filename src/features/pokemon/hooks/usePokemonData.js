import { useEffect, useState } from "react";
import { fetchAllPokemon } from "../api/fetchPokemon"

export default function usePokemonData() {
  const [pokemonList, setPokemonList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchAllPokemon();
        setPokemonList(data);
        setFilteredList(data);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  useEffect(() => {
    let result = pokemonList;
    if (searchTerm) {
      result = result.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (selectedType) {
      result = result.filter(p => p.types.includes(selectedType));
    }
    setFilteredList(result);
  }, [searchTerm, selectedType, pokemonList]);

  return {
    filteredList,
    loading,
    error,
    searchTerm,
    selectedType,
    setSearchTerm,
    setSelectedType
  };
}
