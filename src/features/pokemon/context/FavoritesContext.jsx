import { createContext, useEffect, useState } from 'react';

export const FavoritesContext = createContext();

export const FavoritesContextProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    const stored = localStorage.getItem('favorites');
    return stored ? JSON.parse(stored) : {};
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addPokemonToFavorites = (pokemon) => {
    setFavorites((prev) => ({
      ...prev,
      [pokemon.id]: pokemon
    }));
  };

  const removePokemonFromFavorites = (pokemon) => {
    setFavorites((prev) => {
      const updated = { ...prev };
      delete updated[pokemon.id];
      return updated;
    });
  };

  const isFavorite = (id) => !!favorites[id];

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addPokemonToFavorites,
        removePokemonFromFavorites,
        isFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
