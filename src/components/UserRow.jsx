import { memo, useMemo } from "react";

const UserRow = memo(({ user, style, onClick }) => {
  const expensiveValue = useMemo(() => {
    let result = 0;
    for (let i = 0; i < 1000; i++) {
      result += Math.sqrt(user.age * user.salary) / 100;
    }
    return result.toFixed(2);
  }, [user.id, user.age, user.salary]);

  return (
    <div
      style={{
        ...style,
        display: "flex",
        alignItems: "center",
        padding: "10px",
        borderBottom: "1px solid #eee",
        cursor: "pointer",
        background: "white",
      }}
      onClick={() => onClick(user)}
    >
      <div style={{ flex: "2", fontWeight: "bold" }}>{user.name}</div>
      <div style={{ flex: "2" }}>{user.email}</div>
      <div style={{ flex: "1" }}>{user.age}</div>
      <div style={{ flex: "1" }}>{user.department}</div>
      <div style={{ flex: "1" }}>{user.status}</div>
      <div style={{ flex: "1", fontSize: "12px", color: "#666" }}>
        Score: {expensiveValue}
      </div>
    </div>
  );
});

UserRow.displayName = "UserRow";

export default UserRow;
