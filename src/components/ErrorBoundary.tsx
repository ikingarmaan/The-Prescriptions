import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RotateCcw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
  fallbackMessage?: string;
  onReset?: () => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  declare props: Props;
  declare state: State;
  declare setState: (state: Partial<State> | ((prevState: State) => Partial<State>)) => void;

  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[ErrorBoundary caught error]:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    if (this.props.onReset) {
      this.props.onReset();
    } else {
      window.location.reload();
    }
  };

  public render() {
    if (this.state.hasError) {
      const isPrescription = this.props.fallbackTitle?.toLowerCase().includes('prescription');
      const defaultMessage = isPrescription
        ? 'We processed your prescription, but encountered a temporary display issue when formatting the full interactive results.'
        : 'An unexpected issue occurred while loading this section. Please click below to refresh or try again.';
      const message = this.props.fallbackMessage || defaultMessage;
      const retryLabel = isPrescription ? 'Retry / New Scan' : 'Retry / Reload';

      return (
        <div className="w-full max-w-2xl mx-auto my-8 p-6 sm:p-8 bg-white rounded-3xl border-2 border-amber-300 shadow-sm text-center">
          <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-amber-100 border border-amber-200 flex items-center justify-center text-amber-700">
            <AlertTriangle className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">
            {this.props.fallbackTitle || 'Display Refresh Required'}
          </h3>
          <p className="text-sm text-slate-600 mb-6 max-w-md mx-auto leading-relaxed">
            {message}
          </p>
          <div className="flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={this.handleReset}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-xl shadow-sm transition-all flex items-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{retryLabel}</span>
            </button>
            <button
              type="button"
              onClick={() => {
                window.location.href = '/';
              }}
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold rounded-xl border border-slate-200 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Home className="w-4 h-4" />
              <span>Back Home</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
