import React from "react";
import Button from "../components/ui/Button";

const Home: React.FC = () => (
  <div style={{ textAlign: "center", padding: "2rem" }}>
    <h1>HoldMyBag 🎮</h1>
    <p>Scan a QR code, join a room, play quick games while waiting!</p>
    <Button onClick={() => window.location.href = "/join"}>Join Game</Button>
  </div>
);

export default Home;
