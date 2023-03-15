import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import DashboardAppPage from './pages/DashboardAppPage';
import KidPage from './pages/KidPage';
import DriverPage from './pages/DriverPage';
import BookingPage from './pages/BookingPage';
import UserDetailPage from './pages/UserDetailPage';
import KidDetailPage from './pages/KidDetailPage';
import DriverDetailPage from './pages/DriverDetailPage';
import StatisticalPage from './pages/StatisticalPage';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/',
      element: <Navigate to="login" />,
      index: true,
    },

    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        {
          path: 'user',
          element: <UserPage />,
        },
        {
          path: 'user/:id',
          element: <UserDetailPage />,
        },
        { path: 'kid', element: <KidPage /> },
        {
          path: 'kid/:id',
          element: <KidDetailPage />,
        },
        { path: 'driver', element: <DriverPage /> },
        {
          path: 'driver/:id',
          element: <DriverDetailPage />,
        },
        { path: 'booking', element: <BookingPage /> },
        { path: 'statistical', element: <StatisticalPage /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
