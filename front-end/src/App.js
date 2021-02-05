import React, { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import RouterConfig from './shared/navigation/RouterConfig';
import { MainNavigation } from './shared/components';
import { AuthContext } from './shared/context/auth-context';
import './App.css';
import { useAuth } from './shared/hooks/auth-hook';
import LoadingSpinner from './shared/components/UIElements/LoadingSpinner';

const App = () => {
  const { login, logout, userId, token } = useAuth();
  return (
    <AuthContext.Provider
      value={{ isLoggedIn: !!token, userId, login, logout, token }}
    >
      <Router>
        <MainNavigation />
        <Suspense
          fallback={
            <div className="center">
              <LoadingSpinner asOverlay />
            </div>
          }
        >
          <main>
            <RouterConfig isLoggedIn={!!token} />
          </main>
        </Suspense>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
