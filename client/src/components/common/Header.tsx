import React from "react";

const Header: React.FC = () => (
  <header style={{
    width: "100%",
    padding: "1rem 0",
    background: "#000",
    color: "#fff",
    textAlign: "center",
    fontWeight: 700
  }}>
    <h1>HoldMyBag</h1>
    <p style={{ fontWeight: 400, fontSize: "1rem", margin: "0.25em 0" }}>
      Play quick games while you wait!
    </p>
  </header>
);

export default Header;
