import { useState } from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../../assets/plane.avif";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [hover, setHover] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const email = form.email.trim().toLowerCase();
    const password = form.password.trim();

    if (!email || !password) {
      alert("All fields are required");
      return;
    }

    // 🔥 GET USERS FROM SEED STORAGE
    const users = JSON.parse(localStorage.getItem("allUsers")) || [];

    // 🔥 FIND MATCHING USER
    const foundUser = users.find(
      (u) =>
        u.email.toLowerCase() === email &&
        u.password === password
    );

    if (!foundUser) {
      alert("Invalid email or password");
      return;
    }

    // 🔥 STORE SESSION (ONLY REAL USER)
    const sessionUser = {
      id: foundUser.id,
      name: foundUser.name,
      email: foundUser.email,
      role: foundUser.role,
    };

    localStorage.setItem("user", JSON.stringify(sessionUser));

    // 🔥 ROLE BASED REDIRECT
    if (foundUser.role === "admin") {
      navigate("/dashboard");
    } else if (foundUser.role === "employee") {
      navigate("/employee/bookings");
    } else {
      navigate("/flights");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.overlay}></div>
      <div style={styles.light}></div>

      <div style={styles.wrapper}>
        <form style={styles.card} onSubmit={handleLogin}>
          <h1 style={styles.title}>✈ SkyAir Login</h1>
          <p style={styles.subtitle}>Board your journey in seconds</p>

          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={form.email}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            style={styles.input}
          />

          <button
            type="submit"
            style={{
              ...styles.button,
              background: hover
                ? "#fff"
                : "rgba(255,255,255,0.9)",
              transform: hover ? "translateY(-2px)" : "translateY(0)",
            }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            Take Off 🚀
          </button>

          <p
            onClick={() => navigate("/register")}
            style={styles.link}
          >
            Create new account
          </p>
        </form>

        <div style={styles.right}>
          <h2 style={styles.bigText}>Fly Beyond Limits</h2>
          <p style={styles.desc}>
            Fast. Secure. Comfortable travel experience designed for you.
          </p>
        </div>
      </div>
    </div>
  );
}

/* styles unchanged */
const styles = {
  container: {
    height: "100vh",
    position: "relative",
    overflow: "hidden",
    fontFamily: "sans-serif",
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  },
  overlay: { position: "absolute", inset: 0 },
  light: { position: "absolute", inset: 0 },
  wrapper: {
    position: "relative",
    zIndex: 2,
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    padding: "0 60px",
  },
  card: {
    width: "340px",
    padding: "26px",
    borderRadius: "18px",
    background: "rgba(255,255,255,0.12)",
    backdropFilter: "blur(22px)",
    border: "1px solid rgba(255,255,255,0.2)",
    color: "white",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  input: {
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid rgba(255,255,255,0.2)",
    background: "rgba(255,255,255,0.15)",
    color: "white",
  },
  button: {
    padding: "12px",
    borderRadius: "12px",
    border: "none",
    cursor: "pointer",
    fontWeight: "600",
  },
  link: { textAlign: "center", cursor: "pointer", color: "#93c5fd" },
  title: { textAlign: "center" },
  subtitle: { textAlign: "center", opacity: 0.8 },
  right: { color: "white" },
  bigText: { fontSize: "44px" },
  desc: { opacity: 0.8 },
};