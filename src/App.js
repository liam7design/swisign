import React from 'react';
import AppRouter from './routes/Router';
import { AuthProvider } from './context/AuthContext';
import ErrorBoundary from './components/error/ErrorBoundary';

import './App.css';

const App = () => {
  return (
    <ErrorBoundary>
      <div className="App">
        <AuthProvider>
          <AppRouter />
        </AuthProvider>
      </div>
    </ErrorBoundary>
  );
}

export default App;