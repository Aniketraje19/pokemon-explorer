import { usePokemonData } from "../hooks/usePokemonData";

const filters = ["Id", "Name"];

export default function SortFilter() {
  const { sortingFilter, setSortingFilter } = usePokemonData();

  const handleChange = (e) => {
    setSortingFilter(e.target.value);
  };

  return (
    <div>
      <label htmlFor="sort">Sort by: </label>
      <select id="sort" value={sortingFilter} onChange={handleChange}>
        {filters.map((filter) => (
          <option key={filter} value={filter}>
            {filter}
          </option>
        ))}
      </select>
    </div>
  );
}
