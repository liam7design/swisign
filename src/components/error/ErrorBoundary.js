import React from 'react';
import AppErrorPage from './AppErrorPage';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    
    // 에러 로깅 (실제 프로덕션에서는 에러 추적 서비스 사용)
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <AppErrorPage 
          type="500"
          onClick1={this.handleReset}
          btn1="다시 시도"
          onClick2={() => window.location.reload()}
          btn2="페이지 새로고침"
          // 개발 환경에서만 추가 정보 표시
          {...(process.env.NODE_ENV === 'development' && this.state.error && {
            message: (
              <>
                페이지를 새로고침하거나 다시 시도해주세요.
                <details style={{ marginTop: '1rem', textAlign: 'left' }}>
                  <summary>개발자 정보</summary>
                  <pre style={{ overflow: 'auto', fontSize: '12px' }}>
                    {this.state.error.toString()}
                  </pre>
                </details>
              </>
            )
          })}
        />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 