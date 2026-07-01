import { Routes, Route, Navigate } from "react-router-dom";
import StaffLogin from "./pages/StaffLogin";
import StaffDashboard from "./pages/StaffDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import CustomerPage from "./pages/CustomerPage";

export default function App() {
    return (
        <Routes>

            {/* Customer */}
            <Route path="/" element={<CustomerPage />} />

            {/* Staff Login */}
            <Route
                path="/staff"
                element={<StaffLogin />}
            />

            <Route
                path="/staff/dashboard"
                element={
                    <ProtectedRoute>
                        <StaffDashboard />
                    </ProtectedRoute>
                }
            />

            {/* Staff Dashboard */}
            <Route
                path="/staff/dashboard"
                element={
                    <div style={{ padding: 40 }}>
                        Staff Dashboard (Coming Next)
                    </div>
                }
            />

            {/* Unknown URL */}
            <Route
                path="*"
                element={<Navigate to="/" replace />}
            />

        </Routes>
    );
}