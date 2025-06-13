'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { trackError } from '@/lib/analytics';
import { FaExclamationTriangle, FaRedo, FaHome, FaBug } from 'react-icons/fa';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  errorId: string;
  retryCount: number;
}

class ErrorBoundary extends Component<Props, State> {
  private maxRetries = 3;
  private retryTimeouts: NodeJS.Timeout[] = [];

  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: '',
      retryCount: 0,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    const errorId = `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    return {
      hasError: true,
      error,
      errorId,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const errorId = this.state.errorId;
    
    // Enhanced error logging
    console.group(`🚨 Error Boundary Caught Error [${errorId}]`);
    console.error('Error:', error);
    console.error('Error Info:', errorInfo);
    console.error('Component Stack:', errorInfo.componentStack);
    console.error('Error Stack:', error.stack);
    console.groupEnd();

    // Track error with analytics
    trackError(
      error.name || 'Unknown Error',
      error.message || 'No error message provided',
      errorInfo.componentStack || 'Unknown component'
    );

    // Additional error context
    const errorContext = {
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
      userId: this.getUserId(),
      sessionId: this.getSessionId(),
      errorBoundary: true,
    };

    // Report to external error tracking service
    this.reportError(error, errorInfo, errorContext);

    // Update state with error information
    this.setState({
      errorInfo,
    });

    // Call optional error handler
    this.props.onError?.(error, errorInfo);
  }

  private getUserId(): string {
    // Get user ID from localStorage or return anonymous
    return localStorage.getItem('userId') || 'anonymous';
  }

  private getSessionId(): string {
    // Get session ID from sessionStorage or create new one
    let sessionId = sessionStorage.getItem('sessionId');
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem('sessionId', sessionId);
    }
    return sessionId;
  }

  private async reportError(error: Error, errorInfo: ErrorInfo, context: any) {
    try {
      // In production, you would send this to your error tracking service
      // e.g., Sentry, LogRocket, Bugsnag, etc.
      
      const errorReport = {
        message: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack,
        context,
        errorId: this.state.errorId,
      };

      // Mock API call - replace with your actual error reporting service
      if (process.env.NODE_ENV === 'production') {
        await fetch('/api/errors', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(errorReport),
        }).catch(reportError => {
          console.warn('Failed to report error to server:', reportError);
        });
      }

      // Store error locally for debugging
      const storedErrors = JSON.parse(localStorage.getItem('errorLog') || '[]');
      storedErrors.push(errorReport);
      
      // Keep only last 10 errors to prevent storage overflow
      if (storedErrors.length > 10) {
        storedErrors.splice(0, storedErrors.length - 10);
      }
      
      localStorage.setItem('errorLog', JSON.stringify(storedErrors));
    } catch (reportingError) {
      console.error('Failed to report error:', reportingError);
    }
  }

  private handleRetry = () => {
    const { retryCount } = this.state;
    
    if (retryCount >= this.maxRetries) {
      console.warn('Max retry attempts reached');
      return;
    }

    // Clear any existing timeouts
    this.retryTimeouts.forEach(timeout => clearTimeout(timeout));
    this.retryTimeouts = [];

    // Exponential backoff: 1s, 2s, 4s
    const delay = Math.pow(2, retryCount) * 1000;
    
    const timeout = setTimeout(() => {
      this.setState({
        hasError: false,
        error: null,
        errorInfo: null,
        retryCount: retryCount + 1,
      });
    }, delay);

    this.retryTimeouts.push(timeout);
  };

  private handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      retryCount: 0,
    });
  };

  private handleReload = () => {
    window.location.reload();
  };

  private handleGoHome = () => {
    window.location.href = '/';
  };

  private copyErrorToClipboard = async () => {
    const { error, errorInfo, errorId } = this.state;
    const errorText = `
Error ID: ${errorId}
Error: ${error?.message || 'Unknown error'}
Stack: ${error?.stack || 'No stack trace'}
Component Stack: ${errorInfo?.componentStack || 'No component stack'}
URL: ${window.location.href}
User Agent: ${navigator.userAgent}
Timestamp: ${new Date().toISOString()}
    `.trim();

    try {
      await navigator.clipboard.writeText(errorText);
      alert('Error details copied to clipboard');
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
      // Fallback: show in a text area
      const textarea = document.createElement('textarea');
      textarea.value = errorText;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      alert('Error details copied to clipboard');
    }
  };

  componentWillUnmount() {
    // Clean up timeouts
    this.retryTimeouts.forEach(timeout => clearTimeout(timeout));
  }

  render() {
    if (this.state.hasError) {
      // Custom fallback UI can be provided via props
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const { error, errorId, retryCount } = this.state;
      const canRetry = retryCount < this.maxRetries;

      return (
        <div className="min-h-screen bg-dark-950 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-dark-800 rounded-lg shadow-xl p-8 text-center">
            <div className="mb-6">
              <FaExclamationTriangle className="w-16 h-16 text-rage-500 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-white mb-2">
                Oops! Something went wrong
              </h1>
              <p className="text-gray-400">
                We're sorry for the inconvenience. An unexpected error occurred.
              </p>
            </div>

            {/* Error Details */}
            <div className="bg-dark-900 rounded-lg p-4 mb-6 text-left">
              <h3 className="text-sm font-semibold text-gray-300 mb-2">Error Details</h3>
              <p className="text-xs text-gray-400 mb-1">
                <strong>ID:</strong> {errorId}
              </p>
              <p className="text-xs text-gray-400 break-words">
                <strong>Message:</strong> {error?.message || 'Unknown error'}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              {canRetry && (
                <button
                  onClick={this.handleRetry}
                  className="w-full bg-rage-500 hover:bg-rage-600 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <FaRedo className="w-4 h-4" />
                  Try Again {retryCount > 0 && `(${retryCount}/${this.maxRetries})`}
                </button>
              )}
              
              <button
                onClick={this.handleReload}
                className="w-full bg-dark-700 hover:bg-dark-600 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <FaRedo className="w-4 h-4" />
                Reload Page
              </button>
              
              <button
                onClick={this.handleGoHome}
                className="w-full bg-primary-500 hover:bg-primary-600 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <FaHome className="w-4 h-4" />
                Go to Home
              </button>
            </div>

            {/* Developer Options */}
            <div className="mt-6 pt-6 border-t border-dark-700">
              <details className="text-left">
                <summary className="text-sm text-gray-400 cursor-pointer hover:text-gray-300 flex items-center gap-2">
                  <FaBug className="w-4 h-4" />
                  Developer Options
                </summary>
                <div className="mt-3 space-y-2">
                  <button
                    onClick={this.copyErrorToClipboard}
                    className="w-full text-xs bg-dark-700 hover:bg-dark-600 text-gray-300 py-2 px-3 rounded transition-colors duration-200"
                  >
                    Copy Error Details
                  </button>
                  <button
                    onClick={this.handleReset}
                    className="w-full text-xs bg-dark-700 hover:bg-dark-600 text-gray-300 py-2 px-3 rounded transition-colors duration-200"
                  >
                    Reset Error State
                  </button>
                </div>
              </details>
            </div>

            {/* Help Text */}
            <p className="text-xs text-gray-500 mt-6">
              If this problem persists, please contact support with the error ID above.
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 