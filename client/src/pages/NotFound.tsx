import React from "react";
import Button from "../components/ui/Button";

const NotFound: React.FC = () => (
  <div style={{ textAlign: "center", padding: "2rem" }}>
    <h2>404 • Page Not Found</h2>
    <Button onClick={() => window.location.href = "/"}>Go Home</Button>
  </div>
);

export default NotFound;
