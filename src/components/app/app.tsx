import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { clearCurrentOrder } from '../../services/slices/orderSlice';
import '../../index.css';
import styles from './app.module.css';
import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { ProtectedRoute } from '../protected-route/protected-route';
import { useEffect, useMemo } from 'react';
import { useDispatch } from '../../services/store';
import { fetchUserData } from '../../services/slices/userSlice';
import { fetchIngredients } from '../../services/slices/ingredientsSlice';
import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '../../pages';

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const backgroundLocation = location.state?.background;

  useEffect(() => {
    dispatch(fetchUserData());
    dispatch(fetchIngredients());
  }, [dispatch]);

  const closeModal = () => {
    dispatch(clearCurrentOrder());
    const fallback = -1 as const;
    const target = backgroundLocation?.pathname ?? fallback;
    navigate(target);
  };

  const modalTitle = useMemo(() => {
    const pathname = location.pathname;
    if (pathname.startsWith('/ingredients/')) {
      return 'Детали ингредиента';
    }
    if (
      pathname.startsWith('/feed/') ||
      pathname.startsWith('/profile/orders/')
    ) {
      const last = pathname.split('/').at(-1) ?? '';
      const num = Number.parseInt(last);
      if (!Number.isNaN(num)) {
        return `#${String(num).padStart(6, '0')}`;
      }
    }
    return '';
  }, [location.pathname]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <main>
        <Routes location={backgroundLocation || location}>
          <Route path='/' element={<ConstructorPage />} />
          <Route path='/feed' element={<Feed />} />
          <Route path='/ingredients/:id' element={<IngredientDetails />} />
          <Route path='/feed/:number' element={<OrderInfo />} />

          <Route
            path='/login'
            element={
              <ProtectedRoute onlyUnAuth>
                <Login />
              </ProtectedRoute>
            }
          />
          <Route
            path='/register'
            element={
              <ProtectedRoute onlyUnAuth>
                <Register />
              </ProtectedRoute>
            }
          />
          <Route
            path='/forgot-password'
            element={
              <ProtectedRoute onlyUnAuth>
                <ForgotPassword />
              </ProtectedRoute>
            }
          />
          <Route
            path='/reset-password'
            element={
              <ProtectedRoute onlyUnAuth>
                <ResetPassword />
              </ProtectedRoute>
            }
          />

          <Route
            path='/profile'
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path='/profile/orders'
            element={
              <ProtectedRoute>
                <ProfileOrders />
              </ProtectedRoute>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <ProtectedRoute>
                <OrderInfo />
              </ProtectedRoute>
            }
          />

          <Route path='*' element={<NotFound404 />} />
        </Routes>
        {backgroundLocation && (
          <Routes>
            <Route
              path='/ingredients/:id'
              element={
                <Modal title={modalTitle} onClose={closeModal}>
                  <IngredientDetails />
                </Modal>
              }
            />
            <Route
              path='/feed/:number'
              element={
                <Modal title={modalTitle} onClose={closeModal}>
                  <OrderInfo />
                </Modal>
              }
            />
            <Route
              path='/profile/orders/:number'
              element={
                <ProtectedRoute>
                  <Modal title={modalTitle} onClose={closeModal}>
                    <OrderInfo />
                  </Modal>
                </ProtectedRoute>
              }
            />
          </Routes>
        )}
      </main>
    </div>
  );
};

export default App;
