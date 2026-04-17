import { useState } from "react";

export default function Users() {
  const [users, setUsers] = useState(() => {
    return JSON.parse(localStorage.getItem("allUsers")) || [];
  });

  const deleteUser = (id) => {
    const updated = users.filter((u) => u.id !== id);

    setUsers(updated);
    localStorage.setItem("allUsers", JSON.stringify(updated));
  };

  return (
    <div style={styles.wrapper}>
      <h2 style={styles.heading}>👥 Users Management</h2>

      {users.length === 0 ? (
        <div style={styles.empty}>
          <p>No users found</p>
        </div>
      ) : (
        <div style={styles.grid}>
          {users.map((u) => (
            <div key={u.id} style={styles.card}>
              <h3 style={styles.name}>{u.name || "No Name"}</h3>

              <p><strong>Email:</strong> {u.email}</p>
              <p><strong>Role:</strong> {u.role}</p>

              <button
                style={styles.deleteBtn}
                onClick={() => deleteUser(u.id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
const styles = {
  wrapper: {
    padding: "20px",
  },

  heading: {
    marginBottom: "20px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "15px",
  },

  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
  },

  name: {
    marginBottom: "10px",
    color: "#1e3a5f",
  },

  deleteBtn: {
    marginTop: "10px",
    background: "#dc2626",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: "8px",
    cursor: "pointer",
    width: "100%",
  },

  empty: {
    background: "#fff",
    padding: "30px",
    borderRadius: "12px",
    textAlign: "center",
  },
};