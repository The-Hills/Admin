// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'User',
    path: '/dashboard/user',
    icon: icon('ic_user'),
  },
  {
    title: 'Driver',
    path: '/dashboard/driver',
    icon: icon('ic_cart'),
  },
  {
    title: 'Kid',
    path: '/dashboard/kid',
    icon: icon('ic_blog'),
  },

  {
    title: 'Booking',
    path: '/dashboard/booking',
    icon: icon('ic_blog'),
  },
];

export default navConfig;
