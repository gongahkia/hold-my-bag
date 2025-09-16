import React from "react";

const Footer: React.FC = () => (
  <footer style={{
    width: "100%",
    padding: "1rem 0",
    background: "#000",
    color: "#fff",
    textAlign: "center",
    marginTop: "auto",
    fontSize: "0.9rem"
  }}>
    <span>&copy; {new Date().getFullYear()} HoldMyBag. All rights reserved.</span>
  </footer>
);

export default Footer;
