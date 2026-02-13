import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from "react";

const UsersContext = createContext();

export const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "asc",
  });
  const [filterDepartment, setFilterDepartment] = useState("all");

  const updateUser = useCallback((userId, updatedData) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === userId ? { ...user, ...updatedData } : user,
      ),
    );
  }, []);

  const revertUser = useCallback((userId, originalData) => {
    setUsers((prev) =>
      prev.map((user) => (user.id === userId ? originalData : user)),
    );
  }, []);

  const processedUsers = useMemo(() => {
    let result = [...users];

    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      result = result.filter(
        (user) =>
          user.name.toLowerCase().includes(search) ||
          user.email.toLowerCase().includes(search),
      );
    }

    if (filterDepartment !== "all") {
      result = result.filter((user) => user.department === filterDepartment);
    }

    result.sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];

      if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });

    return result;
  }, [users, searchTerm, filterDepartment, sortConfig]);

  const value = {
    users,
    setUsers,
    loading,
    setLoading,
    error,
    setError,
    searchTerm,
    setSearchTerm,
    sortConfig,
    setSortConfig,
    filterDepartment,
    setFilterDepartment,
    processedUsers,
    updateUser,
    revertUser,
  };

  return (
    <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
  );
};

export const useUsers = () => {
  const context = useContext(UsersContext);
  if (!context) {
    throw new Error("useUsers must be used within UsersProvider");
  }
  return context;
};
