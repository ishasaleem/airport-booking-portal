import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import MainLayout from "./layouts/MainLayout";
import ProtectedRoute from "./routes/ProtectedRoute";

// Passenger
import Flights from "./pages/passenger/Flights";
import Booking from "./pages/passenger/Booking";

// Employee
import ManageBookings from "./pages/employee/ManageBookings";

// Admin
import Users from "./pages/admin/Users";
import ManageFlights from "./pages/admin/ManageFlights";
import AdminDashboard from "./pages/admin/AdminDashboard";

// Common
import Profile from "./pages/common/Profile";
import Contact from "./pages/common/Contact";

/* =========================
   SEED USERS (FIXED)
========================= */
function useSeedUsers() {
  useEffect(() => {
    const existing = localStorage.getItem("allUsers");

    if (!existing) {
      const seedUsers = [
        {
          id: "1",
          name: "Admin User",
          email: "admin@air.com",
          password: "123",
          role: "admin",
        },
        {
          id: "2",
          name: "Employee User",
          email: "employee@air.com",
          password: "123",
          role: "employee",
        },
        {
          id: "3",
          name: "Passenger User",
          email: "user@air.com",
          password: "123",
          role: "passenger",
        },
      ];

      localStorage.setItem("allUsers", JSON.stringify(seedUsers));
      console.log("✅ USERS SEEDED");
    }
  }, []);
}

/* =========================
   SAFE USER GETTER
========================= */
const getUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user"));
  } catch {
    return null;
  }
};

/* =========================
   BOOKING ROUTER
========================= */
function BookingRouter() {
  const user = getUser();

  if (!user) return <Navigate to="/" />;

  return user.role === "employee" ? <ManageBookings /> : <Booking />;
}

/* =========================
   ADMIN GUARD
========================= */
function AdminRoute({ children }) {
  const user = getUser();

  if (!user) return <Navigate to="/" />;

  if (user.role !== "admin") {
    return <h2 style={{ padding: "20px" }}>⛔ Access Denied</h2>;
  }

  return children;
}

/* =========================
   EMPLOYEE GUARD
========================= */
function EmployeeRoute({ children }) {
  const user = getUser();

  if (!user) return <Navigate to="/" />;

  if (user.role !== "employee") {
    return <h2 style={{ padding: "20px" }}>⛔ Access Denied</h2>;
  }

  return children;
}

/* =========================
   APP
========================= */
export default function App() {
  useSeedUsers();

  return (
    <BrowserRouter>
      <Routes>

        {/* AUTH ROUTES */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* PROTECTED LAYOUT */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >

          {/* PASSENGER */}
          <Route path="flights" element={<Flights />} />
          <Route path="booking" element={<BookingRouter />} />

          {/* COMMON */}
          <Route path="profile" element={<Profile />} />
          <Route path="contact" element={<Contact />} />

          {/* EMPLOYEE */}
          <Route
            path="employee/bookings"
            element={
              <EmployeeRoute>
                <ManageBookings />
              </EmployeeRoute>
            }
          />

          {/* ADMIN */}
          <Route
            path="dashboard"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />

          <Route
            path="users"
            element={
              <AdminRoute>
                <Users />
              </AdminRoute>
            }
          />

          <Route
            path="manage-flights"
            element={
              <AdminRoute>
                <ManageFlights />
              </AdminRoute>
            }
          />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}