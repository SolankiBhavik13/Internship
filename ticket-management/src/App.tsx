import { Routes, Route } from "react-router";

import Navbar from "./components/Navbar";
import BoardPage from "./pages/BoardPage";
import NewTicketPage from "./pages/NewTicketPage";
import AboutPage from "./pages/AboutPage";
import NotFoundPage from "./pages/NotFoundPage";

import { TicketProvider } from "./context/TicketContext";

function App() {
  return (
    <TicketProvider>
      <div className="app">
        <Navbar />

        <main>
          <Routes>
            <Route path="/" element={<BoardPage />} />
            <Route path="/new" element={<NewTicketPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>

        <footer className="footer">
          TicketDesk © 2026 | Built with React + TypeScript
        </footer>
      </div>
    </TicketProvider>
  );
}

export default App;