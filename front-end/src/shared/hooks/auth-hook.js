import { useCallback, useEffect, useState } from 'react';

let logoutTimer;

export const useAuth = () => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [tokenExpirationTime, setTokenExpirationTime] = useState();

  const login = useCallback((uId, tokenRec, expirationDate) => {
    setUserId(uId);
    setToken(tokenRec);
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60);
    setTokenExpirationTime(tokenExpirationDate);
    localStorage.setItem(
      'userData',
      JSON.stringify({
        userId: uId,
        token: tokenRec,
        expiration: tokenExpirationDate.toISOString(),
      }),
    );
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('userData');
    setTokenExpirationTime(null);
    setUserId(null);
    setToken(null);
  }, []);

  useEffect(() => {
    if (token && tokenExpirationTime) {
      const remainingTime = tokenExpirationTime - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationTime]);

  useEffect(() => {
    if (localStorage.key('userData')) {
      const storedData = JSON.parse(localStorage.getItem('userData'));
      if (
        storedData &&
        storedData.token &&
        new Date(storedData.expiration) > new Date()
      ) {
        login(storedData.userId, storedData.token);
      }
    }
  }, [login]);

  return { login, logout, userId, token };
};
