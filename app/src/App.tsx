import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { HospitalsProvider } from "./context/HospitalsContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { LoginPage } from "./pages/LoginPage";
import { PartnerListPage } from "./pages/PartnerListPage";
import { HospitalDetailPage } from "./pages/HospitalDetailPage";

function App() {
  return (
    <AuthProvider>
      <HospitalsProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/partners"
              element={
                <ProtectedRoute>
                  <PartnerListPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/partners/:id"
              element={
                <ProtectedRoute>
                  <HospitalDetailPage />
                </ProtectedRoute>
              }
            />
            <Route path="/" element={<Navigate to="/partners" replace />} />
            <Route path="*" element={<Navigate to="/partners" replace />} />
          </Routes>
        </BrowserRouter>
      </HospitalsProvider>
    </AuthProvider>
  );
}

export default App;
