import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import ErrorBoundary from "./components/common/ErrorBoundary";
import Home from "./pages/Home";
import JoinGame from "./pages/JoinGame";
import GameRoom from "./pages/GameRoom";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const App: React.FC = () => (
  <ErrorBoundary>
    <BrowserRouter>
      <Header />
      <main style={{ minHeight: "70vh" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/join" element={<JoinGame />} />
          <Route path="/room/:roomCode" element={<GameRoom />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  </ErrorBoundary>
);

export default App;
