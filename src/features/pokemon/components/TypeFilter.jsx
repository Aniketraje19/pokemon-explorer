import { usePokemonData } from "../hooks/usePokemonData";

const types = [
  "", "fire", "water", "grass", "electric", "bug",
  "normal", "poison", "fairy", "ground", "fighting",
  "psychic", "rock", "ghost", "ice", "dragon", "dark", "steel", "flying"
];

export default function TypeFilter() {
const {selectedTypes,setSelectedTypes} = usePokemonData()
  const handleChange = (e) => {
    let selected = Array.from(e.target.selectedOptions, (option) => option.value);
    if (selected.includes("")) {
      selected = [];
    }
    setSelectedTypes(selected);
  };

  return (
    <select
      multiple
      value={selectedTypes.length === 0 ? [""] : selectedTypes}
      onChange={handleChange}
      className="p-2 border border-gray-300 rounded-lg w-48 shadow-sm"
    >

      {types.map(type => (
        <option key={type} value={type}>
          {type === "" ? "All Types" : type.charAt(0).toUpperCase() + type.slice(1)}
        </option>
      ))}
    </select>
  );
}
