
type SearchBarProps = {
  search: string;
  setSearch: (value: string) => void;
};

function SearchBar({ search, setSearch }: SearchBarProps) {
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search tickets by subject..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        className="search-input"
      />
    </div>
  );
}

export default SearchBar;
