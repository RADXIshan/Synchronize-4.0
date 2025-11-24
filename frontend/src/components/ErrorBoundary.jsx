import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Spline Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <div className="w-full h-full flex items-center justify-center text-white/50">3D Scene Failed to Load</div>;
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
