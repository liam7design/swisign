import React from 'react';
import AppRouter from './routes/Router';
import { AuthProvider } from './context/AuthContext';

import './App.css';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </div>

  );
}

export default App;