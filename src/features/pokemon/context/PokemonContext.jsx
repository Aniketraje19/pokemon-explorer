import { createContext, useEffect, useState } from 'react';
import { fetchPokemon } from '../api/fetchPokemon';

export const PokemonContext = createContext();
let cachedPokemon = null;


export const PokemonProvider = ({ children }) => {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortingFilter,setSortingFilter] = useState("Id")

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        let data;
        if (cachedPokemon) {
          data = cachedPokemon;
        } else {
          data = await fetchPokemon(page, itemsPerPage);
          cachedPokemon = data;
        }

        const filteredData = data.filter((pokemon) => {
          const matchesSearchTerm = pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
          const matchesType = selectedTypes.length ? selectedTypes.every((type) => pokemon.types.includes(type)) : true;
          return matchesSearchTerm && matchesType;
        });

        const sortedData = [...filteredData].sort((a, b) => {
          switch (sortingFilter) {
            case 'Name':
              return a.name.localeCompare(b.name);
            case 'Id':
              return a.id - b.id;
            default:
              return a.id - b.id;
          }
        });

        const paginatedData = sortedData.slice((page - 1) * itemsPerPage, page * itemsPerPage);
        setTotalItems(filteredData.length);
        setPokemonList(paginatedData);
      } catch (e) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, itemsPerPage, searchTerm, selectedTypes,sortingFilter]);

  return (
    <PokemonContext.Provider
      value={{
        pokemonList,
        loading,
        error,
        searchTerm,
        setSearchTerm,
        selectedTypes,
        setSelectedTypes,
        page,
        setPage,
        itemsPerPage,
        setItemsPerPage,
        totalItems,
        sortingFilter,
        setSortingFilter
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};

