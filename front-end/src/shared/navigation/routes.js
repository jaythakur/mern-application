import React from 'react';

const UsersContainer = React.lazy(() =>
  import('../../pages/users/UsersContainer'),
);
const NewPlace = React.lazy(() => import('../../pages/places/NewPlace'));
const UserPlaces = React.lazy(() => import('../../pages/places/UserPlaces'));
const UpdatePlace = React.lazy(() => import('../../pages/places/UpdatePlace'));
const AuthContainer = React.lazy(() =>
  import('../../pages/auth/AuthContainer'),
);

export const getListOfRoutes = () => [
  { path: '/', exact: true, component: UsersContainer },
  { path: '/places/new', exact: true, component: NewPlace, auth: true },
  { path: '/:userId/places', exact: true, component: UserPlaces },
  { path: '/places/:placeId', exact: true, component: UpdatePlace, auth: true },
  { path: '/auth', exact: true, component: AuthContainer, auth: false },
];
