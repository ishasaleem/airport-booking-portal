/* eslint-disable react-hooks/set-state-in-effect */
 import { useState, useEffect } from "react";

export default function ManageFlights() {
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;

  const [flights, setFlights] = useState([]);
  const [form, setForm] = useState({
    from: "",
    to: "",
    date: "",
    price: "",
  });

  const [message, setMessage] = useState("");

  // ✅ LOAD FLIGHTS SAFELY
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("adminFlights")) || [];
    setFlights(stored);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🚨 ROLE PROTECTION
  const addFlight = (e) => {
    e.preventDefault();

    if (role !== "admin") {
      setMessage("⛔ Only admin can add flights");
      return;
    }

    if (!form.from || !form.to || !form.date || !form.price) {
      setMessage("⚠ Please fill all fields");
      return;
    }

    const newFlight = {
      id: Date.now(),
      from: form.from,
      to: form.to,
      date: form.date,
      price: Number(form.price), // ✅ FIXED TYPE
      createdBy: user?.email || "admin",
    };

    const updated = [newFlight, ...flights];

    setFlights(updated);
    localStorage.setItem("adminFlights", JSON.stringify(updated));

    setForm({ from: "", to: "", date: "", price: "" });

    setMessage("✅ Flight added successfully");

    setTimeout(() => setMessage(""), 2000);
  };

  // DELETE FLIGHT
  const deleteFlight = (id) => {
    if (role !== "admin") {
      setMessage("⛔ Only admin can delete flights");
      return;
    }

    const updated = flights.filter((f) => f.id !== id);

    setFlights(updated);
    localStorage.setItem("adminFlights", JSON.stringify(updated));

    setMessage("🗑 Flight deleted");

    setTimeout(() => setMessage(""), 2000);
  };

  return (
    <div style={styles.wrapper}>
      <h2 style={styles.heading}>✈ Manage Flights</h2>

      {message && <div style={styles.message}>{message}</div>}

      {/* FORM (ADMIN ONLY) */}
      {role === "admin" && (
        <form onSubmit={addFlight} style={styles.form}>
          <input
            name="from"
            placeholder="From"
            onChange={handleChange}
            value={form.from}
            style={styles.input}
          />

          <input
            name="to"
            placeholder="To"
            onChange={handleChange}
            value={form.to}
            style={styles.input}
          />

          <input
            name="date"
            type="date"
            onChange={handleChange}
            value={form.date}
            style={styles.input}
          />

          <input
            name="price"
            placeholder="Price"
            onChange={handleChange}
            value={form.price}
            style={styles.input}
          />

          <button style={styles.addBtn}>+ Add Flight</button>
        </form>
      )}

      {/* EMPTY STATE */}
      {flights.length === 0 ? (
        <div style={styles.empty}>
          <p>No flights added yet ✈</p>
        </div>
      ) : (
        <div style={styles.grid}>
          {flights.map((f) => (
            <div key={f.id} style={styles.card}>
              <h3 style={styles.route}>
                {f.from} → {f.to}
              </h3>

              <p><strong>Date:</strong> {f.date}</p>
              <p><strong>Price:</strong> Rs {f.price}</p>

              <p style={{ fontSize: "12px", color: "#666" }}>
                Created by: {f.createdBy}
              </p>

              {/* DELETE ONLY FOR ADMIN */}
              {role === "admin" && (
                <button
                  onClick={() => deleteFlight(f.id)}
                  style={styles.deleteBtn}
                >
                  Delete
                </button>
              )}
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
    marginBottom: "15px",
  },

  message: {
    background: "#dcfce7",
    color: "#16a34a",
    padding: "10px",
    borderRadius: "8px",
    marginBottom: "15px",
  },

  form: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "10px",
    marginBottom: "20px",
  },

  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ddd",
  },

  addBtn: {
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
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

  route: {
    color: "#1e3a5f",
    marginBottom: "10px",
  },

  deleteBtn: {
    marginTop: "10px",
    background: "#dc2626",
    color: "#fff",
    border: "none",
    padding: "8px",
    borderRadius: "6px",
    cursor: "pointer",
    width: "100%",
  },

  empty: {
    background: "#fff",
    padding: "30px",
    borderRadius: "12px",
    textAlign: "center",
    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
  },
};