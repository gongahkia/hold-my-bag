import React, { Component, ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // Optionally send error info to error reporting service here.
    // console.error("ErrorBoundary caught:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: "2rem", textAlign: "center", color: "#b00"
        }}>
          <h2>Something went wrong.</h2>
          <p>Please try refreshing or rejoining.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
