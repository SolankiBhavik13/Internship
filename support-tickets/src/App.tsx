import { Routes, Route } from "react-router";

import Layout from "./components/layout/Layout";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import TicketDetail from "./pages/TicketDetail";

import AuthedRoute from "./components/AuthedRoute";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <AuthedRoute>
              <Dashboard />
            </AuthedRoute>
          }
        />

        <Route
          path="/ticket/:id"
          element={
            <AuthedRoute>
              <TicketDetail />
            </AuthedRoute>
          }
        />
      </Routes>
    </Layout>
  );
}

export default App;