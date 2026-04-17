/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react";

export default function ManageBookings() {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);

  // Load user
  useEffect(() => {
    const u = JSON.parse(localStorage.getItem("user") || "null");
    setUser(u);
  }, []);

  // Load bookings safely (NO MUTATION)
  useEffect(() => {
    const allBookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    const flights = JSON.parse(localStorage.getItem("flights") || "[]");

    const validFlightIds = new Set(flights.map((f) => f.id));

    // ⚠️ ONLY FILTER IN MEMORY (DO NOT SAVE BACK)
    const cleaned = allBookings.filter(
      (b) => !b.flightId || validFlightIds.has(b.flightId)
    );

    const filtered =
      user?.role === "employee" || user?.role === "admin"
        ? cleaned
        : cleaned.filter((b) => String(b.userId) === String(user?.id));

    setBookings(filtered);
  }, [user]);

  // Update booking status
  const updateStatus = (id, status) => {
    const allBookings = JSON.parse(localStorage.getItem("bookings") || "[]");

    const updated = allBookings.map((b) =>
      b.id === id ? { ...b, status } : b
    );

    localStorage.setItem("bookings", JSON.stringify(updated));

    // instant UI update (no reload)
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status } : b))
    );
  };

  return (
    <div style={styles.wrapper}>
      <h2>🧑‍💼 Manage Bookings</h2>

      {bookings.length === 0 ? (
        <p>No bookings available</p>
      ) : (
        <div style={styles.grid}>
          {bookings.map((b) => (
            <div key={b.id} style={styles.card}>
              <h3>{b.from} → {b.to}</h3>

              <p>Date: {b.date}</p>
              <p>Rs {b.price}</p>
              <p>Status: {b.status}</p>

              {(user?.role === "employee" || user?.role === "admin") &&
                b.status !== "Cancelled" &&
                b.status !== "Completed" && (
                  <div style={styles.actions}>
                    <button onClick={() => updateStatus(b.id, "Approved")}>
                      Approve
                    </button>

                    <button onClick={() => updateStatus(b.id, "Rejected")}>
                      Reject
                    </button>

                    <button onClick={() => updateStatus(b.id, "Completed")}>
                      Complete
                    </button>
                  </div>
                )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  wrapper: { padding: "20px" },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "20px",
  },

  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
  },

  actions: {
    display: "flex",
    gap: "10px",
    marginTop: "10px",
  },
};