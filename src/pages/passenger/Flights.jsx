/* eslint-disable react-hooks/purity */
import { useState, useEffect } from "react";

export default function Flights() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [search, setSearch] = useState("");
  const [flights, setFlights] = useState([]);

  // ✅ LOAD ADMIN FLIGHTS ONLY
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("adminFlights")) || [];
    setFlights(stored);
  }, []);

  const handleSearch = (value) => {
    setSearch(value);

    const stored = JSON.parse(localStorage.getItem("adminFlights")) || [];

    const filtered = stored.filter(
      (f) =>
        f.from.toLowerCase().includes(value.toLowerCase()) ||
        f.to.toLowerCase().includes(value.toLowerCase())
    );

    setFlights(filtered);
  };

  const handleBooking = (flight) => {
    if (!user?.id) return;

    const existing = JSON.parse(localStorage.getItem("bookings")) || [];

    const newBooking = {
      id: Date.now(),
      userId: user.id,
      from: flight.from,
      to: flight.to,
      date: flight.date,
      price: flight.price,
      status: "Booked",
    };

    localStorage.setItem(
      "bookings",
      JSON.stringify([newBooking, ...existing])
    );

    alert("✅ Flight booked!");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>✈ Available Flights</h2>

      <input
        placeholder="Search..."
        value={search}
        onChange={(e) => handleSearch(e.target.value)}
      />

      {flights.length === 0 ? (
        <p>No flights available</p>
      ) : (
        flights.map((f) => (
          <div key={f.id}>
            <h3>{f.from} → {f.to}</h3>
            <p>{f.date}</p>
            <p>Rs {f.price}</p>

            <button onClick={() => handleBooking(f)}>
              Book
            </button>
          </div>
        ))
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

  searchBox: {
    marginBottom: "20px",
  },

  input: {
    padding: "12px",
    width: "300px",
    borderRadius: "25px",
    border: "1px solid #ddd",
    outline: "none",
  },

  message: {
    background: "#dcfce7",
    color: "#16a34a",
    padding: "10px",
    borderRadius: "8px",
    marginBottom: "15px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "20px",
  },

  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
  },

  route: {
    color: "#2b4c7e",
    marginBottom: "10px",
  },

  bookBtn: {
    marginTop: "10px",
    width: "100%",
    padding: "10px",
    border: "none",
    borderRadius: "8px",
    background: "#2563eb",
    color: "#fff",
    cursor: "pointer",
  },

  empty: {
    background: "#fff",
    padding: "30px",
    borderRadius: "12px",
    textAlign: "center",
    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
  },
};