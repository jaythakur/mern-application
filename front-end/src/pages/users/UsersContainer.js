import React, { useEffect, useState } from 'react';

import UsersList from './components/UsersList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hooks';

const UsersContainer = () => {
  const [users, setUsers] = useState([]);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    try {
      sendRequest(`${process.env.REACT_APP_BACKEND_URL}/users`).then(
        (responseData) => {
          setUsers(responseData.users);
        },
      );
    } catch (err) {
      console.log(err);
    }
  }, [sendRequest]);
  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      {!isLoading && users && <UsersList items={users} />}
    </>
  );
};

export default UsersContainer;
