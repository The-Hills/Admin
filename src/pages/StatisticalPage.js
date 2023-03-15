import {
  Button,
  Container,
  Stack,
  Table,
  TableContainer,
  TableRow,
  Typography,
  TableHead,
  TableCell,
  TableBody,
  Collapse,
  Box,
  IconButton,
  Grid,
} from '@mui/material';
import { DateCalendar } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import bookingAPI from '../API/bookings';
import { fDateTime, convertMonthToName, getArrayDayofMonth, getDayOfMonth } from '../utils/formatTime';
import { AppWebsiteVisits } from '../sections/@dashboard/app';

const currentDate = new Date();

const StatisticalPage = () => {
  const [open, setOpen] = useState(false);

  const [date, setDate] = useState({
    day: currentDate.getDate(),
    month: currentDate.getMonth() + 1,
    year: currentDate.getFullYear(),
  });

  const [dataByDate, setDataByDate] = useState({});

  const [dataByMonth, setDataByMonth] = useState({});

  const [month, setMonth] = useState({
    month: currentDate.getMonth() + 1,
    year: currentDate.getFullYear(),
  });

  const [statisticalByDate, setStatisticalByDate] = useState(true);

  const onHandleChangeStatisticalBy = (statisticalBy) => {
    if (statisticalBy === 'day') {
      return setStatisticalByDate(true);
    }
    return setStatisticalByDate(false);
  };

  const getDataBookingByDate = async () => {
    const response = await bookingAPI.getDataStatisticalByDate(`${date.year}-${date.month}-${date.day}`);

    const { data } = response.data;
    setDataByDate(data);
  };

  const getDataBookingByMonth = async () => {
    const response = await bookingAPI.getDataStatisticalByMonth(month.month, month.year);

    const { data } = response.data;

    setDataByMonth(data);
  };

  useEffect(() => {
    getDataBookingByDate();
    setOpen(false);
  }, [date.day, date.month, date.year]);

  useEffect(() => {
    getDataBookingByMonth();
  }, [month.month, month.year]);

  return (
    <>
      <Helmet>
        <title> statistical | Pikid </title>
      </Helmet>

      <Container>
        <Stack direction="column">
          <Stack direction="column" justifyContent="center" alignItems="flex-start" spacing={10}>
            <Stack direction="row" spacing={2}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={() => onHandleChangeStatisticalBy('day')}
              >
                Day
              </Button>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                onClick={() => onHandleChangeStatisticalBy('month')}
              >
                Month
              </Button>
            </Stack>
            {statisticalByDate ? (
              <Grid container spacing={5}>
                <Grid item xs={12} md={12} lg={4}>
                  <DateCalendar
                    value={dayjs(`${date.year}-${date.month}-${date.day}`)}
                    onChange={(newDate) =>
                      setDate((prevDate) => ({
                        ...prevDate,
                        day: newDate.date(),
                        month: newDate.month() + 1,
                        year: newDate.year(),
                      }))
                    }
                    disableFuture
                  />
                </Grid>
                <Grid item xs={12} md={12} lg={8}>
                  <TableContainer>
                    <Table size="medium">
                      <TableBody>
                        <TableRow>
                          <TableCell>
                            {!!dataByDate?.countBooking && (
                              <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                              </IconButton>
                            )}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            Booking
                          </TableCell>
                          <TableCell align="right">
                            {!open && dataByDate?.countBooking}
                            <Collapse in={open} timeout="auto" unmountOnExit>
                              <Box sx={{ margin: 1 }}>
                                <Table size="medium" aria-label="purchases">
                                  <TableHead>
                                    <TableRow>
                                      <TableCell>Kid</TableCell>
                                      <TableCell>Driver</TableCell>
                                      <TableCell align="right">Distance</TableCell>
                                      <TableCell align="right">Start time</TableCell>
                                      <TableCell align="right">End time</TableCell>
                                      <TableCell align="right">Status</TableCell>
                                      <TableCell align="right">Fee($)</TableCell>
                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                    {dataByDate.booking?.map((booking) => (
                                      <TableRow key={booking.id}>
                                        <TableCell component="th" scope="row">
                                          {booking?.kid?.name}
                                        </TableCell>
                                        <TableCell>{booking?.driver?.name}</TableCell>
                                        <TableCell align="right">{booking?.distance}</TableCell>
                                        <TableCell align="right">{fDateTime(booking?.startTime)}</TableCell>
                                        <TableCell align="right">{fDateTime(booking?.endTime)}</TableCell>
                                        <TableCell align="right">{booking?.status}</TableCell>
                                        <TableCell align="right">{booking?.fee}</TableCell>
                                      </TableRow>
                                    ))}
                                  </TableBody>
                                </Table>
                              </Box>
                            </Collapse>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>{}</TableCell>
                          <TableCell component="th" scope="row">
                            Revenue
                          </TableCell>
                          <TableCell style={{ width: 160 }} align="right">
                            {dataByDate?.total}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>
            ) : (
              <Grid container spacing={2}>
                <Grid item xs={12} md={12} lg={4}>
                  <Stack direction="row" spacing={15}>
                    <Stack direction="column" spacing={2} width={'auto'}>
                      <Typography variant="h4">Statistical by Month</Typography>
                      <DateCalendar
                        value={dayjs(`${month.year}-${month.month}`)}
                        views={['year', 'month']}
                        openTo="month"
                        onChange={(newDate) =>
                          setMonth((prevDate) => ({
                            ...prevDate,
                            month: newDate.month() + 1,
                            year: newDate.year(),
                          }))
                        }
                        disableFuture
                      />
                    </Stack>
                    <Table>
                      <TableBody>
                        <TableRow>
                          <TableCell component="th" scope="row">
                            ToTal Booking
                          </TableCell>
                          <TableCell>{dataByMonth.quantity}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell component="th" scope="row">
                            Revenue
                          </TableCell>
                          <TableCell>{dataByMonth.total}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </Stack>
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                  <AppWebsiteVisits
                    title="Statistical"
                    subheader={`${convertMonthToName(month.month)} ${month.year}`}
                    chartLabels={getArrayDayofMonth(getDayOfMonth(month.month, month.year), month.month, month.year)}
                    chartData={[
                      {
                        name: 'Quantity',
                        type: 'column',
                        fill: 'solid',
                        data: dataByMonth.countBooking,
                      },
                      {
                        name: 'Price',
                        type: 'line',
                        fill: 'solid',
                        data: dataByMonth.totalPriceBooking,
                      },
                    ]}
                  />
                </Grid>
              </Grid>
            )}
          </Stack>
        </Stack>
      </Container>
    </>
  );
};

export default StatisticalPage;
