import { Helmet } from 'react-helmet-async';
import { Grid, Container, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDataStatistical } from '../redux/Booking/thunk';
import { AppWebsiteVisits, AppWidgetSummary } from '../sections/@dashboard/app';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const dispatch = useDispatch();

  const data = useSelector((state) => state.getBookingReducer.statistical);


  useEffect(() => {
    dispatch(getDataStatistical());
  }, [dispatch]);

  return (
    <>
      <Helmet>
        <title> Dashboard | Pikid </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={2.4}>
            <AppWidgetSummary title="User" total={data?.count?.user} icon={'ant-design:android-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={2.4}>
            <AppWidgetSummary
              title="Driver"
              total={data?.count?.driver}
              color="info"
              icon={'ant-design:apple-filled'}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={2.4}>
            <AppWidgetSummary title="Kid" total={data?.count?.kid} color="warning" icon={'ant-design:windows-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={2.4}>
            <AppWidgetSummary
              title="Booking"
              total={data?.count?.booking}
              color="error"
              icon={'ant-design:bug-filled'}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={2.4}>
            <AppWidgetSummary title="Total Revenue" total={data?.total} color="error" icon={'ant-design:bug-filled'} />
          </Grid>

          <Grid item xs={12} md={12} lg={12}>
            <AppWebsiteVisits
              title="Booking"
              subheader="2023"
              chartLabels={[
                '01/01/2003',
                '02/01/2003',
                '03/01/2003',
                '04/01/2003',
                '05/01/2003',
                '06/01/2003',
                '07/01/2003',
                '08/01/2003',
                '09/01/2003',
                '10/01/2003',
                '11/01/2003',
                '12/01/2003',
              ]}
              chartData={[
                {
                  name: 'Total booking',
                  type: 'line',
                  fill: 'solid',
                  data: data?.result,
                },
              ]}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
