import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { performLogin } from '../../services/slices/userSlice';
import { useLocation, Navigate } from 'react-router-dom';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const location = useLocation();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(performLogin({ email, password }));
  };

  if (user) {
    return <Navigate to={location.state?.from || '/'} replace />;
  }

  return (
    <LoginUI
      errorText={''}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
