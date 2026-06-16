import { Component, type ErrorInfo, type ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error("Erreur d'affichage du site :", error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: "100dvh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
            textAlign: "center",
            background: "hsl(0 0% 4%)",
            color: "hsl(40 10% 90%)",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          <p style={{ fontSize: "1.125rem", marginBottom: "1rem" }}>
            Le site n’a pas pu se charger correctement.
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            style={{
              padding: "0.75rem 1.5rem",
              borderRadius: "9999px",
              border: "2px solid hsl(175 35% 40%)",
              background: "transparent",
              color: "hsl(175 35% 40%)",
              cursor: "pointer",
              fontSize: "0.875rem",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Réessayer
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export { ErrorBoundary };
