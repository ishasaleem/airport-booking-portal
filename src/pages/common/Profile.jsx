import { useState } from "react";

export default function Profile() {
  const storedUser = JSON.parse(localStorage.getItem("user")) || {};

  const [user, setUser] = useState(storedUser);
  const [editMode, setEditMode] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (!user.name || user.name.trim().length < 3) {
      setMessage("❌ Name must be at least 3 characters");
      return false;
    }

    if (!user.email || !user.email.includes("@")) {
      setMessage("❌ Enter a valid email");
      return false;
    }

    return true;
  };

  const handleSave = () => {
    if (!validate()) {
      setTimeout(() => setMessage(""), 2000);
      return;
    }

    localStorage.setItem("user", JSON.stringify(user));
    setEditMode(false);
    setMessage("✅ Profile updated successfully!");
    setTimeout(() => setMessage(""), 2000);
  };

  return (
    <div>
      <h2 style={styles.heading}>👤 Account Profile</h2>

      {message && <div style={styles.message}>{message}</div>}

      <div style={styles.container}>
        {/* LEFT PANEL */}
        <div style={styles.left}>
          <div style={styles.avatar}>
            {user.name ? user.name.charAt(0).toUpperCase() : "U"}
          </div>

          <h3 style={{ marginBottom: "5px" }}>
            {user.name || "User Name"}
          </h3>

          <span style={styles.roleBadge}>{user.role}</span>

          <p style={styles.hint}>
            {editMode ? "Editing mode enabled" : "View only mode"}
          </p>
        </div>

        {/* RIGHT PANEL */}
        <div style={styles.right}>
          <div style={styles.field}>
            <label>Full Name</label>
            <input
              name="name"
              value={user.name || ""}
              onChange={handleChange}
              disabled={!editMode}
              style={{
                ...styles.input,
                background: editMode ? "#fff" : "#f3f4f6",
              }}
            />
          </div>

          <div style={styles.field}>
            <label>Email Address</label>
            <input
              name="email"
              value={user.email || ""}
              onChange={handleChange}
              disabled={!editMode}
              style={{
                ...styles.input,
                background: editMode ? "#fff" : "#f3f4f6",
              }}
            />
          </div>

          <div style={styles.field}>
            <label>Role</label>
            <input
              value={user.role || ""}
              disabled
              style={{ ...styles.input, background: "#f3f4f6" }}
            />
          </div>

          <div style={styles.actions}>
            {!editMode ? (
              <button
                style={styles.editBtn}
                onClick={() => setEditMode(true)}
              >
                Edit Profile
              </button>
            ) : (
              <>
                <button style={styles.saveBtn} onClick={handleSave}>
                  Save Changes
                </button>

                <button
                  style={styles.cancelBtn}
                  onClick={() => {
                    setUser(storedUser);
                    setEditMode(false);
                    setMessage("");
                  }}
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
const styles = {
  heading: {
    marginBottom: "20px",
  },

  container: {
    display: "flex",
    gap: "25px",
    flexWrap: "wrap",
    background: "#fff",
    padding: "25px",
    borderRadius: "14px",
    boxShadow: "0 6px 16px rgba(0,0,0,0.06)",
  },

  left: {
    flex: "1",
    minWidth: "220px",
    textAlign: "center",
    padding: "20px",
    borderRight: "1px solid #eee",
  },

  avatar: {
    width: "90px",
    height: "90px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
    color: "#fff",
    fontSize: "32px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 15px",
    fontWeight: "bold",
  },

  roleBadge: {
    display: "inline-block",
    padding: "5px 12px",
    borderRadius: "20px",
    background: "#e0f2fe",
    color: "#0369a1",
    fontSize: "12px",
    textTransform: "uppercase",
    marginBottom: "10px",
  },

  hint: {
    fontSize: "12px",
    color: "#888",
  },

  right: {
    flex: "2",
    minWidth: "250px",
  },

  field: {
    marginBottom: "15px",
    display: "flex",
    flexDirection: "column",
  },

  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    marginTop: "5px",
    outline: "none",
  },

  actions: {
    marginTop: "20px",
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
  },

  editBtn: {
    padding: "10px 14px",
    border: "none",
    borderRadius: "8px",
    background: "#2563eb",
    color: "#fff",
    cursor: "pointer",
  },

  saveBtn: {
    padding: "10px 14px",
    border: "none",
    borderRadius: "8px",
    background: "#16a34a",
    color: "#fff",
    cursor: "pointer",
  },

  cancelBtn: {
    padding: "10px 14px",
    border: "none",
    borderRadius: "8px",
    background: "#ef4444",
    color: "#fff",
    cursor: "pointer",
  },

  message: {
    background: "#ecfdf5",
    color: "#16a34a",
    padding: "10px",
    borderRadius: "8px",
    marginBottom: "15px",
  },
};