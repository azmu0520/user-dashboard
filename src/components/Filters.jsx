import { useUsers } from "../context/UsersContext";

const departments = [
  "Engineering",
  "Marketing",
  "Sales",
  "HR",
  "Finance",
  "Operations",
  "Product",
  "Design",
  "Support",
  "Legal",
];

function Filters() {
  const { filterDepartment, setFilterDepartment, sortConfig, setSortConfig } =
    useUsers();

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  return (
    <div
      style={{
        marginBottom: "20px",
        display: "flex",
        gap: "20px",
        alignItems: "center",
      }}
    >
      {/* Department Filter */}
      <div>
        <label style={{ marginRight: "10px" }}>Department:</label>
        <select
          value={filterDepartment}
          onChange={(e) => setFilterDepartment(e.target.value)}
          style={{ padding: "8px", fontSize: "14px" }}
        >
          <option value="all">All Departments</option>
          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>
      </div>

      {/* Sort Controls */}
      <div>
        <label style={{ marginRight: "10px" }}>Sort by:</label>
        <button
          onClick={() => handleSort("name")}
          style={{
            padding: "8px 12px",
            marginRight: "5px",
            background: sortConfig.key === "name" ? "#007bff" : "#f0f0f0",
            color: sortConfig.key === "name" ? "white" : "black",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Name{" "}
          {sortConfig.key === "name" &&
            (sortConfig.direction === "asc" ? "↑" : "↓")}
        </button>
        <button
          onClick={() => handleSort("email")}
          style={{
            padding: "8px 12px",
            marginRight: "5px",
            background: sortConfig.key === "email" ? "#007bff" : "#f0f0f0",
            color: sortConfig.key === "email" ? "white" : "black",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Email{" "}
          {sortConfig.key === "email" &&
            (sortConfig.direction === "asc" ? "↑" : "↓")}
        </button>
        <button
          onClick={() => handleSort("age")}
          style={{
            padding: "8px 12px",
            background: sortConfig.key === "age" ? "#007bff" : "#f0f0f0",
            color: sortConfig.key === "age" ? "white" : "black",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Age{" "}
          {sortConfig.key === "age" &&
            (sortConfig.direction === "asc" ? "↑" : "↓")}
        </button>
      </div>
    </div>
  );
}

export default Filters;
