import { useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useCallback, useEffect, useState } from 'react';
import {
  Card,
  Table,
  Stack,
  Avatar,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  CardHeader,
  CardContent,
} from '@mui/material';
import { sentenceCase } from 'change-case';
import kidAPI from '../API/kids';
import Scrollbar from '../components/scrollbar/Scrollbar';
import UserListHead from '../sections/@dashboard/user/UserListHead';
import { fCurrency } from '../utils/formatNumber';
import { fDateTime } from '../utils/formatTime';
import Label from '../components/label/Label';

const TABLE_HEAD = [
  { id: 'driver', label: 'Driver', alignRight: false },
  { id: 'distance', label: 'Distance', alignRight: false },
  { id: 'fee', label: 'Fee', alignRight: false },
  { id: 'pickupLocation', label: 'Pick Up Location', alignRight: false },
  { id: 'dropOffLocation', label: 'Drop Off Location', alignRight: false },
  { id: 'startTime', label: 'Start Time', alignRight: false },
  { id: 'endTime', label: 'End Time', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
];

const KidDetailPage = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [kidInfo, setKidInfo] = useState({});

  const getKidData = useCallback(async () => {
    const response = await kidAPI.getKidById(id);
    setKidInfo(response.data.data);
  }, [id]);

  useEffect(() => {
    getKidData();
  }, [id, getKidData]);

  console.log(kidInfo);

  return (
    <>
      <Helmet>
        <title> {kidInfo.name || ''} | Pikid </title>
      </Helmet>

      <Container>
        <Stack direction="row" spacing={5} alignItems="center" mb={5}>
          <Avatar alt={kidInfo.name} src={kidInfo.avatar} sx={{ width: 150, height: 150 }} />
          <Typography variant="h3" gutterBottom>
            {kidInfo.name}
          </Typography>
        </Stack>

        <Stack direction="row" spacing={5} alignItems="center" mb={5}>
          <Typography variant="h3" gutterBottom>
            Parent
          </Typography>
        </Stack>

        <Card
          key={id}
          sx={{ maxWidth: 345 }}
          onClick={() => {
            navigate(`/dashboard/user/${kidInfo.parent.id}`);
          }}
        >
          <CardHeader
            avatar={<Avatar src={kidInfo?.parent?.avatar} alt={kidInfo?.parent?.name} sx={{ width: 50, height: 50 }} />}
            title={kidInfo?.parent?.name}
          />

          <CardContent>
            <Stack direction={'row'} alignItems="center" spacing={2}>
              <Typography variant="h5" align="justify">
                Gender:
              </Typography>
              <Typography variant="body1" align="justify">
                {kidInfo?.parent?.gender}
              </Typography>
            </Stack>

            <Stack direction={'row'} alignItems="center" spacing={2}>
              <Typography variant="h5" align="justify">
                Phone:
              </Typography>
              <Typography variant="body1" align="justify">
                {kidInfo?.parent?.phone}
              </Typography>
            </Stack>
          </CardContent>
        </Card>

        <Stack direction="row" spacing={5} alignItems="center" mb={5}>
          <Typography variant="h3" gutterBottom>
            Ride
          </Typography>
        </Stack>

        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead headLabel={TABLE_HEAD} rowCount={kidInfo.booking?.length} />
                <TableBody>
                  {kidInfo.booking?.map((row) => {
                    const { id, driver, distance, fee, startTime, endTime, status } = row;
                    console.log(row);
                    return (
                      <TableRow hover key={id} tabIndex={-1} role="checkbox">
                        <TableCell> </TableCell>

                        <TableCell
                          align="center"
                          onClick={() => {
                            navigate(`/dashboard/driver/${driver?.id}`);
                          }}
                        >
                          <Stack direction="row" alignItems="center" spacing={2}>
                            {driver && <Avatar alt={driver?.name} src={driver?.avatar} />}
                            <Typography variant="subtitle2" noWrap>
                              {driver?.name}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell align="center">{distance}</TableCell>

                        <TableCell align="center">{fCurrency(fee)}</TableCell>

                        <TableCell align="center">{'101B Le Huu Trac Phuoc My Son Tra Da Nang'}</TableCell>

                        <TableCell align="center">{'99 To Hien Thanh Phuoc My Son Tra Da Nang'}</TableCell>

                        <TableCell align="center">{fDateTime(startTime)}</TableCell>

                        <TableCell align="center">{fDateTime(endTime)}</TableCell>

                        <TableCell align="center">
                          <Label
                            color={
                              (status === 'onTracking' && 'warning') || (status === 'onRide' && 'primary') || 'success'
                            }
                          >
                            {sentenceCase(status)}
                          </Label>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
        </Card>
      </Container>
    </>
  );
};

export default KidDetailPage;
