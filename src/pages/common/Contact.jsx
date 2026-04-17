export default function Contact() {
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role || "user";

  return (
    <div style={styles.wrapper}>

      {/* HEADER */}
      <div
        style={{
          ...styles.header,
          background:
            role === "admin"
              ? "linear-gradient(135deg, #dc2626, #991b1b)"
              : role === "employee"
              ? "linear-gradient(135deg, #2563eb, #1e3a8a)"
              : "linear-gradient(135deg, #16a34a, #14532d)",
        }}
      >
        <h2 style={styles.title}>📞 Contact Support</h2>
        <p style={styles.subtitle}>
          Logged in as: {role.toUpperCase()}
        </p>
      </div>

      {/* GRID */}
      <div style={styles.grid}>

        {/* COMMON INFO */}
        <div style={styles.card}>
          <h3>📌 Support Center</h3>
          <p>
            We provide 24/7 support for all airport booking system users.
          </p>

          <div style={styles.infoBox}>
            <p>📧 support@airport.com</p>
            <p>📞 +92 300 1234567</p>
            <p>⏰ Available 24/7</p>
          </div>
        </div>

        {/* ROLE BASED INFO ONLY (NO BUTTONS) */}
        <div style={styles.card}>

          {role === "passenger" && (
            <>
              <h3>✈ Passenger Support</h3>
              <ul>
                <li>Flight booking issues</li>
                <li>Ticket cancellation help</li>
                <li>Refund related queries</li>
                <li>Flight schedule support</li>
              </ul>
            </>
          )}

          {role === "employee" && (
            <>
              <h3>🧑‍💼 Employee Support</h3>
              <ul>
                <li>Booking management issues</li>
                <li>System access problems</li>
                <li>Flight schedule updates</li>
                <li>Operational assistance</li>
              </ul>
            </>
          )}

          {role === "admin" && (
            <>
              <h3>🛠 Admin Support</h3>
              <ul>
                <li>System configuration issues</li>
                <li>User management support</li>
                <li>Flight control panel help</li>
                <li>Platform maintenance</li>
              </ul>
            </>
          )}

        </div>
      </div>
    </div>
  );
}
const styles = {
  wrapper: {
    padding: "20px",
  },

  header: {
    padding: "20px",
    borderRadius: "12px",
    color: "#fff",
    marginBottom: "20px",
  },

  title: {
    margin: 0,
  },

  subtitle: {
    marginTop: "5px",
    opacity: 0.9,
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
  },

  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
  },

  infoBox: {
    marginTop: "15px",
    padding: "10px",
    background: "#f1f5f9",
    borderRadius: "10px",
  },
};