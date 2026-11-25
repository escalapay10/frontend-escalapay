import { Navigate, createBrowserRouter } from 'react-router-dom';
import { AppLayout } from '../components/layout/AppLayout';
import { ProtectedRoute } from '../features/auth/ProtectedRoute';
import LoginPage from '../features/auth/pages/LoginPage';
import RegisterPage from '../features/auth/pages/RegisterPage';
import DashboardPage from '../features/wallet/pages/DashboardPage';
import OperationsPage from '../features/operations/pages/OperationsPage';
import TransactionsPage from '../features/transactions/pages/TransactionsPage';
import RatesPage from '../features/rates/pages/RatesPage';
import { NotFoundPage } from './NotFoundPage';

/**
 * Router COMPLETO desde el Sprint 1 (decisión de Fase 0):
 * todas las rutas existen desde el inicio; las que aún no están construidas
 * renderizan un placeholder. Así evitamos renombrar rutas a mitad del Sprint 2.
 *
 * - /login y /register → públicas (FE-2: Caro)
 * - resto → protegidas por ProtectedRoute
 */
export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      {
        path: 'dashboard',
        element: (
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'operations',
        element: (
          <ProtectedRoute>
            <OperationsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'transactions',
        element: (
          <ProtectedRoute>
            <TransactionsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'rates',
        element: (
          <ProtectedRoute>
            <RatesPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },
  { path: '*', element: <NotFoundPage /> },
]);
