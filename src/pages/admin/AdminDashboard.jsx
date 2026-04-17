import { useState } from "react";

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;

  const [data] = useState(() => {
    return {
      users: JSON.parse(localStorage.getItem("allUsers")) || [],
      bookings: JSON.parse(localStorage.getItem("bookings")) || [],
      flights: JSON.parse(localStorage.getItem("adminFlights")) || [],
    };
  });

  return (
    <div>
      <h2 style={{ marginBottom: "20px" }}>
        📊 {role.charAt(0).toUpperCase() + role.slice(1)} Dashboard
      </h2>

      {/* Passenger Dashboard */}
      {role === "passenger" && (
        <div style={styles.grid}>
          <div style={styles.card}>
            ✈ My Bookings
            <h2>{data.bookings.length}</h2>
          </div>

          <div style={styles.card}>
            🕒 Upcoming Flights
            <h2>
              {
                data.bookings.filter((b) => b.status !== "Cancelled").length
              }
            </h2>
          </div>
        </div>
      )}

      {/* Employee Dashboard */}
      {role === "employee" && (
        <div style={styles.grid}>
          <div style={styles.card}>
            📦 Total Bookings
            <h2>{data.bookings.length}</h2>
          </div>

          <div style={styles.card}>
            ⏳ Pending Requests
            <h2>
              {
                data.bookings.filter((b) => b.status === "Pending").length
              }
            </h2>
          </div>
        </div>
      )}

      {/* Admin Dashboard */}
      {role === "admin" && (
        <div style={styles.grid}>
          <div style={styles.card}>
            👥 Users
            <h2>{data.users.length}</h2>
          </div>

          <div style={styles.card}>
            📦 Bookings
            <h2>{data.bookings.length}</h2>
          </div>

          <div style={styles.card}>
            ✈ Flights
            <h2>{data.flights.length}</h2>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  grid: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
  },

  card: {
    flex: "1",
    minWidth: "200px",
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
  },
};