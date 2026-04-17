/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react";

export default function Booking() {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);

  // Load user safely
  useEffect(() => {
    const u = JSON.parse(localStorage.getItem("user") || "null");
    setUser(u);
  }, []);

  // Load bookings whenever user changes
  useEffect(() => {
    if (!user?.id) return;

    const all = JSON.parse(localStorage.getItem("bookings") || "[]");

    const userBookings = all.filter(
      (b) => String(b.userId) === String(user.id)
    );

    setBookings(userBookings);
  }, [user]);

  const cancelBooking = (id) => {
    const all = JSON.parse(localStorage.getItem("bookings") || "[]");

    const updated = all.map((b) =>
      b.id === id ? { ...b, status: "Cancelled" } : b
    );

    localStorage.setItem("bookings", JSON.stringify(updated));

    setBookings(
      updated.filter((b) => String(b.userId) === String(user?.id))
    );
  };

  return (
    <div style={styles.wrapper}>
      <h2>🎟 My Bookings</h2>

      {bookings.length === 0 ? (
        <p>No bookings found</p>
      ) : (
        bookings.map((b) => (
          <div key={b.id} style={styles.card}>
            <h3>{b.from} → {b.to}</h3>
            <p>{b.date}</p>
            <p>Rs {b.price}</p>
            <p>Status: {b.status}</p>

            {b.status !== "Cancelled" && (
              <button onClick={() => cancelBooking(b.id)}>
                Cancel
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
}


const styles = {
  wrapper: { padding: "20px" },
  input: { padding: "12px", width: "300px" },
  grid: { display: "grid", gap: "15px" },
  card: { padding: "15px", background: "#fff" },
};