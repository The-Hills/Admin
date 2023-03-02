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
import UserDetail from './pages/UserDetail';
// import DriverRequestPage from './pages/DriverRequestPage';

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
          element: <UserDetail />,
        },
        { path: 'kid', element: <KidPage /> },
        { path: 'driver', element: <DriverPage /> },
        // { path: 'driver_request', element: <DriverRequestPage /> },
        { path: 'booking', element: <BookingPage /> },
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
