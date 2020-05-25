import React from 'react';

const EMAIL_SUBJECT = encodeURI('1 Click Quiz - Error');

type PropTypes = any;

type State = {
  hasError?: boolean;
};

class ErrorBoundary extends React.Component<PropTypes, State> {
  constructor(props: PropTypes) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(erro: any) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    // You can also log the error to an error reporting service
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="error-boundary container text-center">
          <h1>Something went wrong.</h1>
          <div className="mv-50">
            Please&nbsp;
            <a
              className="text-light-color"
              href={`mailto:jonnyk_78@hotmail.com?subject=${EMAIL_SUBJECT}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              email me for help
            </a>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
