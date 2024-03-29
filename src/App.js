import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
// Date
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

// routes
import { Provider } from 'react-redux';
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import { StyledChart } from './components/chart';
import ScrollToTop from './components/scroll-to-top';
import store from './redux/store';

// ----------------------------------------------------------------------

export default function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Provider store={store}>
        <HelmetProvider>
          <BrowserRouter>
            <ThemeProvider>
              <ScrollToTop />
              <StyledChart />
              <Router />
            </ThemeProvider>
          </BrowserRouter>
        </HelmetProvider>
      </Provider>
    </LocalizationProvider>
  );
}
