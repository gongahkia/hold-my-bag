import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

export function useSocket(serverUrl: string): Socket | null {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    socketRef.current = io(serverUrl, { transports: ["websocket"] });
    return () => {
      socketRef.current?.disconnect();
      socketRef.current = null;
    };
  }, [serverUrl]);

  return socketRef.current;
}
