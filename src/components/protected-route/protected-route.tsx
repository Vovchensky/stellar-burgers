import { useSelector } from '../../services/store';
import { Navigate, useLocation } from 'react-router-dom';
import { Preloader } from '../ui/preloader';
import React from 'react';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  onlyUnAuth = false,
  children
}: ProtectedRouteProps) => {
  const location = useLocation();
  const authResolved = useSelector((state) => state.user.authResolved);
  const currentUser = useSelector((state) => state.user.user);

  if (!authResolved) {
    return <Preloader />;
  }

  const isAuthenticated = Boolean(currentUser);

  if (!onlyUnAuth && !isAuthenticated) {
    return <Navigate to='/login' replace state={{ from: location }} />;
  }

  if (onlyUnAuth && isAuthenticated) {
    const redirectTarget = location.state?.from || { pathname: '/' };
    return <Navigate to={redirectTarget} replace />;
  }

  return children;
};
