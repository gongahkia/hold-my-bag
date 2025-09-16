import React from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ open, onClose, children }) => {
  if (!open) return null;
  return (
    <div
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0, bottom: 0,
        background: "rgba(0,0,0,0.4)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
      onClick={onClose}
    >
      <div
        style={{
          minWidth: 320,
          background: "#fff",
          borderRadius: "7px",
          padding: "1.6rem",
          position: "relative",
          boxShadow: "0 2px 20px rgba(0,0,0,0.12)"
        }}
        onClick={e => e.stopPropagation()}
      >
        {children}
        <Button onClick={onClose} style={{ marginTop: "1rem" }}>Close</Button>
      </div>
    </div>
  );
};

import Button from "./Button";
export default Modal;
