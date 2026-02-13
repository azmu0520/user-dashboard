import { useEffect, useState } from "react";
import { useUsers } from "../context/UsersContext";

function SearchBar() {
  const { setSearchTerm } = useUsers();
  const [localSearch, setLocalSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchTerm(localSearch);
    }, 300);

    return () => clearTimeout(timer);
  }, [localSearch, setSearchTerm]);

  return (
    <div style={{ marginBottom: "20px" }}>
      <input
        type="text"
        placeholder="Search by name or email..."
        value={localSearch}
        onChange={(e) => setLocalSearch(e.target.value)}
        style={{
          padding: "10px",
          width: "300px",
          fontSize: "14px",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
      />
      {localSearch && (
        <button
          onClick={() => setLocalSearch("")}
          style={{ marginLeft: "10px", padding: "10px", cursor: "pointer" }}
        >
          Clear
        </button>
      )}
    </div>
  );
}

export default SearchBar;
