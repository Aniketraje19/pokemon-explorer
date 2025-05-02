import { useContext } from "react";
import { PokemonContext } from "../context/PokemonContext";

export const usePokemonData = () => useContext(PokemonContext);
