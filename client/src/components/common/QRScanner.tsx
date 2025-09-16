import React from "react";
import { QrScanner } from "@yudiel/react-qr-scanner";

interface QRScannerProps {
  onResult: (result: string) => void;
  onError?: (error: Error) => void;
}

const QRScanner: React.FC<QRScannerProps> = ({ onResult, onError }) => (
  <div style={{
    width: "100%", maxWidth: "350px", margin: "auto"
  }}>
    <QrScanner
      onDecode={onResult}
      onError={err => onError?.(err)}
      constraints={{ facingMode: "environment" }}
      containerStyle={{ border: "1px solid #000", borderRadius: 8 }}
      videoStyle={{ width: "100%" }}
    />
    <p style={{ textAlign: "center", fontSize: "0.85rem", color: "#222", margin: "0.5em 0" }}>
      Aim your camera at a game room QR code.
    </p>
  </div>
);

export default QRScanner;
