import { useState, useMemo } from "react";
import PokemonCard from "./PokemonCard";
import Pagination from "./Pagination";
import { usePokemonData } from "../hooks/usePokemonData";
import SearchInput from "./SearchInput";
import TypeFilter from "./TypeFilter";
import Loader from "../../../ui/Loader"
import SortFilter from "./SortFilter";

export default function PokemonList() {

  
  const {
    pokemonList,    
    loading,
    error,
    searchTerm,
    selectedTypes,
    setSearchTerm,
    setSelectedTypes,
    totalItems,
    page,
    setPage,
    itemsPerPage,
    setItemsPerPage
  } = usePokemonData();

   if (loading) return <Loader />;

   if (error)
    return (
      <div className="h-screen flex items-center justify-center text-xl font-semibold text-red-500">
        Failed to load data.
      </div>
    );

    const handleSelectedTypesChange = (selected) => {
      setCurrentPage(1)
      setSelectedTypes(selected);
    }



  return (
    <div>
      <div className="mt-6 flex flex-col md:flex-row gap-4 items-center justify-center">
        {/* Search and Type Filter */}
        <SearchInput />
        <TypeFilter  />
        <SortFilter />
      </div>

      {/* Pokémon Cards */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
        {pokemonList.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>

      {/* Pagination */}
      <Pagination/>
    </div>
  );
}
