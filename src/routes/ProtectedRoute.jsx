import { Navigate } from "react-router-dom";

const getUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user"));
  } catch {
    return null;
  }
};

export default function ProtectedRoute({ children, allowedRoles }) {
  const user = getUser();

  // Not logged in → redirect
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // Role restriction
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    if (user.role === "admin") {
      return <Navigate to="/dashboard" replace />;
    }

    if (user.role === "employee") {
      return <Navigate to="/employee/bookings" replace />;
    }

    return <Navigate to="/flights" replace />;
  }

  return children;
}