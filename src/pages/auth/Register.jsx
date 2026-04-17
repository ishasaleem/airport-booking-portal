import { useState } from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../../assets/plane.avif";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [hover, setHover] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegister = (e) => {
    e.preventDefault();

    const name = form.name.trim();
    const email = form.email.trim().toLowerCase();
    const password = form.password.trim();

    if (!name || !email || !password) {
      alert("All fields required");
      return;
    }

    const users = JSON.parse(localStorage.getItem("allUsers")) || [];

    const exists = users.find((u) => u.email === email);

    if (exists) {
      alert("User already exists");
      return;
    }

    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password,
      role: "passenger",
    };

    const updatedUsers = [...users, newUser];

    localStorage.setItem("allUsers", JSON.stringify(updatedUsers));

    alert("Registration successful!");
    navigate("/");
  };

  return (
    <div style={styles.container}>
      <div style={styles.overlay}></div>
      <div style={styles.light}></div>

      <div style={styles.wrapper}>
        <form style={styles.card} onSubmit={handleRegister}>
          <h2 style={styles.title}>🧳 Create Account</h2>
          <p style={styles.subtitle}>Start your journey with SkyAir</p>

          <input
            name="name"
            placeholder="Name"
            onChange={handleChange}
            style={styles.input}
          />

          <input
            name="email"
            placeholder="Email"
            onChange={handleChange}
            style={styles.input}
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            style={styles.input}
          />

          <button
            type="submit"
            style={{
              ...styles.button,
              background: hover ? "#fff" : "rgba(255,255,255,0.9)",
              transform: hover ? "translateY(-2px)" : "translateY(0)",
            }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            Register ✈
          </button>

          <p onClick={() => navigate("/")} style={styles.link}>
            Already have an account?
          </p>
        </form>
      </div>
    </div>
  );
}
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
    filter: "saturate(1.2) contrast(1.1) brightness(0.9)",
  },

  overlay: {
    position: "absolute",
    inset: 0,
    background: `linear-gradient(
      120deg,
      rgba(0,0,0,0.75),
      rgba(15,23,42,0.55),
      rgba(0,0,0,0.65)
    )`,
  },

  light: {
    position: "absolute",
    inset: 0,
    background:
      "radial-gradient(circle at 30% 20%, rgba(59,130,246,0.25), transparent 60%)",
    mixBlendMode: "screen",
  },

  wrapper: {
    position: "relative",
    zIndex: 2,
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  card: {
    width: "340px",
    padding: "26px",
    borderRadius: "18px",
    background: "rgba(255,255,255,0.12)",
    backdropFilter: "blur(22px)",
    border: "1px solid rgba(255,255,255,0.2)",
    boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    color: "white",
  },

  title: {
    margin: 0,
    fontSize: "22px",
    textAlign: "center",
  },

  subtitle: {
    margin: 0,
    fontSize: "13px",
    textAlign: "center",
    opacity: 0.85,
  },

  input: {
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid rgba(255,255,255,0.2)",
    background: "rgba(255,255,255,0.15)",
    color: "white",
    outline: "none",
  },

  button: {
    padding: "12px",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.25)",
    background: "rgba(255,255,255,0.9)",
    color: "#0f172a",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },

  link: {
    textAlign: "center",
    fontSize: "13px",
    cursor: "pointer",
    color: "#93c5fd",
  },
};