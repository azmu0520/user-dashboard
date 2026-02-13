import { useEffect, useState } from "react";
import { UsersProvider, useUsers } from "./context/UsersContext";
import { generateUsers } from "./utils/generateUsers";
import SearchBar from "./components/SearchBar";
import Filters from "./components/Filters";
import UsersTable from "./components/UsersTable";
import UserModal from "./components/UserModal";

function AppContent() {
  const { setUsers, setLoading, loading, error, processedUsers } = useUsers();
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      const mockUsers = generateUsers(10000);
      setUsers(mockUsers);
      setLoading(false);
      console.log("Users loaded:", mockUsers.length);
    }, 500);
  }, [setUsers, setLoading]);

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div>
          <h2>Loading 10,000 users...</h2>
          <div style={{ textAlign: "center", marginTop: "10px" }}>⏳</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "20px", color: "red" }}>
        <h2>Error loading users</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", maxWidth: "1400px", margin: "0 auto" }}>
      <h1>Users Dashboard</h1>
      <p style={{ color: "#666", marginBottom: "20px" }}>
        Managing {processedUsers.length} users with smooth performance
      </p>

      <SearchBar />
      <Filters />
      <UsersTable onUserClick={handleUserClick} />

      {selectedUser && (
        <UserModal user={selectedUser} onClose={handleCloseModal} />
      )}
    </div>
  );
}

function App() {
  return (
    <UsersProvider>
      <AppContent />
    </UsersProvider>
  );
}

export default App;
