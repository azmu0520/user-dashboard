import { useCallback, useMemo } from "react";
import { List } from "react-window";
import { useUsers } from "../context/UsersContext";
import UserRow from "./UserRow";

function UsersTable({ onUserClick }) {
  const { processedUsers, searchTerm, filterDepartment, sortConfig } =
    useUsers();
  const ROW_HEIGHT = 60;

  const listKey = useMemo(() => {
    return `${searchTerm}-${filterDepartment}-${sortConfig.key}-${sortConfig.direction}`;
  }, [searchTerm, filterDepartment, sortConfig]);

  const RowComponent = useCallback(
    ({ index, style }) => {
      const user = processedUsers[index];
      return <UserRow user={user} style={style} onClick={onUserClick} />;
    },
    [processedUsers, onUserClick],
  );

  if (!processedUsers || processedUsers.length === 0) {
    return (
      <div style={{ padding: "40px", textAlign: "center", color: "#666" }}>
        <h3>No users found</h3>
        <p>Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          padding: "10px",
          background: "#f5f5f5",
          borderBottom: "2px solid #ddd",
          fontWeight: "bold",
        }}
      >
        <div style={{ flex: "2" }}>Name</div>
        <div style={{ flex: "2" }}>Email</div>
        <div style={{ flex: "1" }}>Age</div>
        <div style={{ flex: "1" }}>Department</div>
        <div style={{ flex: "1" }}>Status</div>
        <div style={{ flex: "1" }}>Score</div>
      </div>

      <List
        key={listKey}
        rowComponent={RowComponent}
        rowCount={processedUsers.length}
        rowHeight={ROW_HEIGHT}
        rowProps={{}}
        style={{ height: "600px", width: "100%" }}
      />

      <div style={{ marginTop: "10px", color: "#666", fontSize: "14px" }}>
        Showing {processedUsers.length} users
      </div>
    </div>
  );
}

export default UsersTable;
