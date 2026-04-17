import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import headerBg from "../assets/header.avif";

/* MENU ITEM */
function MenuItem({ label, path, navigate, active }) {
  return (
    <div
      onClick={() => navigate(path)}
      style={{
        display: "flex",
        alignItems: "center",
        padding: "11px 14px",
        borderRadius: "10px",
        cursor: "pointer",
        fontSize: "14px",
        fontWeight: active ? "600" : "500",
        color: active ? "#0f2742" : "#cbd5e1",
        background: active ? "rgba(255,255,255,0.95)" : "transparent",
        borderLeft: active ? "4px solid #60a5fa" : "4px solid transparent",
        transition: "all 0.2s ease",
      }}
      onMouseEnter={(e) => {
        if (!active) {
          e.currentTarget.style.background = "rgba(255,255,255,0.08)";
          e.currentTarget.style.transform = "translateX(3px)";
        }
      }}
      onMouseLeave={(e) => {
        if (!active) {
          e.currentTarget.style.background = "transparent";
          e.currentTarget.style.transform = "translateX(0)";
        }
      }}
    >
      {label}
    </div>
  );
}

export default function MainLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ RESPONSIVE STATE
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  })();

  const role = user?.role;

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div style={styles.wrapper}>
      {/* SIDEBAR */}
      {!isMobile && (
        <aside style={styles.sidebar}>
          <div>
            {/* LOGO */}
            <div style={styles.logoBox}>
              <div style={styles.logoIcon}>✈</div>
              <div>
                <div style={styles.logoText}>SkyAir</div>
                <div style={styles.logoSub}>Travel System</div>
              </div>
            </div>

            {/* NAVIGATION */}
            <div style={styles.sectionTitle}>NAVIGATION</div>

            <div style={styles.menu}>
              <MenuItem
                label="Dashboard"
                path="/dashboard"
                navigate={navigate}
                active={location.pathname === "/dashboard"}
              />

              {role === "passenger" && (
                <>
                  <MenuItem
                    label="Flights"
                    path="/flights"
                    navigate={navigate}
                    active={location.pathname === "/flights"}
                  />
                  <MenuItem
                    label="My Bookings"
                    path="/booking"
                    navigate={navigate}
                    active={location.pathname === "/booking"}
                  />
                </>
              )}

              {role === "employee" && (
                <MenuItem
                  label="Manage Bookings"
                  path="/booking"
                  navigate={navigate}
                  active={location.pathname === "/booking"}
                />
              )}

              {role === "admin" && (
                <>
                  <MenuItem
                    label="Users"
                    path="/users"
                    navigate={navigate}
                    active={location.pathname === "/users"}
                  />
                  <MenuItem
                    label="Manage Flights"
                    path="/manage-flights"
                    navigate={navigate}
                    active={location.pathname === "/manage-flights"}
                  />
                </>
              )}
            </div>

            {/* ACCOUNT */}
            <div style={styles.sectionTitle}>ACCOUNT</div>

            <div style={styles.menu}>
              <MenuItem
                label="Profile"
                path="/profile"
                navigate={navigate}
                active={location.pathname === "/profile"}
              />
              <MenuItem
                label="Contact"
                path="/contact"
                navigate={navigate}
                active={location.pathname === "/contact"}
              />
            </div>
          </div>

          {/* LOGOUT */}
          <div style={styles.logout} onClick={logout}>
            🚪 Logout
          </div>
        </aside>
      )}

      {/* MAIN */}
      <main style={styles.main}>
        {/* HEADER */}
        <header
          style={{
            ...styles.header,
            flexDirection: isMobile ? "column" : "row",
            gap: isMobile ? "10px" : "0",
          }}
        >
          <h3 style={styles.title}>✈ Airport Booking System</h3>

          <div style={styles.headerRight}>
            <input
              placeholder="Search flights..."
              style={{
                ...styles.search,
                width: isMobile ? "100%" : "260px",
              }}
            />
            <div style={styles.roleBadge}>{role?.toUpperCase()}</div>
          </div>
        </header>

        {/* CONTENT */}
        <section style={styles.content}>
          <Outlet />
        </section>
      </main>
    </div>
  );
}

/* STYLES */
const styles = {
  wrapper: {
    display: "flex",
    height: "100vh",
    fontFamily: "Inter, sans-serif",
    background: "#f3f6fb",
  },

  sidebar: {
    width: "270px",
    background: "linear-gradient(180deg, #0b1c2e, #081524)",
    color: "#fff",
    padding: "18px 14px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    boxShadow: "8px 0 30px rgba(0,0,0,0.25)",
    position: "sticky",
    top: 0,
    height: "100vh",
    overflowY: "auto",
  },

  logoBox: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "10px",
    marginBottom: "14px",
  },

  logoIcon: { fontSize: "22px" },
  logoText: { fontSize: "16px", fontWeight: "700" },
  logoSub: { fontSize: "12px", color: "#94a3b8" },

  sectionTitle: {
    fontSize: "11px",
    letterSpacing: "1px",
    color: "#64748b",
    margin: "14px 10px 6px",
  },

  menu: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },

  logout: {
    padding: "12px",
    borderRadius: "12px",
    cursor: "pointer",
    textAlign: "center",
    fontSize: "14px",
    fontWeight: "600",
    color: "#fca5a5",
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,100,100,0.25)",
  },

  main: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },

  header: {
    padding: "16px 25px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundImage: `url(${headerBg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    color: "#000035",
  },

  title: {
    margin: 0,
    fontSize: "18px",
    fontWeight: "600",
  },

  headerRight: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    flexWrap: "wrap",
  },

  search: {
    padding: "10px 14px",
    borderRadius: "10px",
    border: "none",
    outline: "none",
    background: "rgba(255,255,255,0.92)",
  },

  roleBadge: {
    background: "rgba(255,255,255,0.2)",
    color: "#fff",
    padding: "6px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "600",
    backdropFilter: "blur(8px)",
  },

  content: {
    padding: "25px",
    overflowY: "auto",
  },
};