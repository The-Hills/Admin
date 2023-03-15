import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  Table,
  Stack,
  Avatar,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
} from '@mui/material';
import { sentenceCase } from 'change-case';
import driverAPI from '../API/drivers';
import Scrollbar from '../components/scrollbar/Scrollbar';
import UserListHead from '../sections/@dashboard/user/UserListHead';
import { fCurrency } from '../utils/formatNumber';
import { fDateTime } from '../utils/formatTime';
import Label from '../components/label/Label';

const TABLE_HEAD = [
  { id: 'kid', label: 'Kid', alignRight: false },
  { id: 'distance', label: 'Distance', alignRight: false },
  { id: 'fee', label: 'Fee', alignRight: false },
  { id: 'pickupLocation', label: 'Pick Up Location', alignRight: false },
  { id: 'dropOffLocation', label: 'Drop Off Location', alignRight: false },
  { id: 'startTime', label: 'Start Time', alignRight: false },
  { id: 'endTime', label: 'End Time', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
];

const DriverDetailPage = () => {
  const { id } = useParams();

  const [driverInfo, setDriverInfo] = useState({});

  const getDriverData = useCallback(async () => {
    const response = await driverAPI.getDriverById(id);
    setDriverInfo(response.data.data);
  }, [id]);

  useEffect(() => {
    getDriverData();
  }, [getDriverData, id]);

  console.log(driverInfo);

  return (
    <>
      <Helmet>
        <title> {driverInfo.name || ''} | Pikid </title>
      </Helmet>

      <Container>
        <Stack direction="row" spacing={5} alignItems="center" mb={5}>
          <Avatar alt={driverInfo.name} src={driverInfo.avatar} sx={{ width: 150, height: 150 }} />
          <Typography variant="h3" gutterBottom>
            {driverInfo.name}
          </Typography>
        </Stack>

        <Stack mb={10}>
          <Stack direction="row" spacing={5} alignItems="center" mb={2}>
            <Typography variant="h3" gutterBottom>
              Vehicle
            </Typography>
          </Stack>

          <Stack direction="row" spacing={2} alignItems="center" mb={1}>
            <Typography variant="h6">Vehicle type:</Typography>
            <Typography variant="span">{driverInfo?.vehicle?.vehicleType.name}</Typography>
          </Stack>

          <Stack direction="row" spacing={2} alignItems="center" mb={1}>
            <Typography variant="h6">Vehicle name:</Typography>
            <Typography variant="span">{driverInfo?.vehicle?.vehicleName}</Typography>
          </Stack>

          <Stack direction="row" spacing={2} alignItems="center" mb={1}>
            <Typography variant="h6">Vehicle color:</Typography>
            <Typography variant="span">{driverInfo?.vehicle?.vehicleColor}</Typography>
          </Stack>

          <Stack direction="row" spacing={2} alignItems="center" mb={1}>
            <Typography variant="h6">License Plates:</Typography>
            <Typography variant="span">{driverInfo?.vehicle?.licensePlates}</Typography>
          </Stack>

          <Stack direction="row" spacing={2} alignItems="center" mb={1}>
            <Typography variant="h6">Vehicle color:</Typography>
            <Typography variant="span">{driverInfo?.vehicle?.vehicleColor}</Typography>
          </Stack>

          <Stack direction="row" spacing={2} alignItems="center" mb={1}>
            <Typography variant="h6">Vehicle color:</Typography>
            <img
              src={driverInfo?.vehicle?.vehicleImage}
              alt={driverInfo?.vehicle?.vehicleName}
              // sizes={{ width: 100, height: 100 }}
            />
          </Stack>
        </Stack>

        <Stack>
          <Stack direction="row" spacing={5} alignItems="center" mb={2}>
            <Typography variant="h3" gutterBottom>
              Ride
            </Typography>
          </Stack>

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead headLabel={TABLE_HEAD} rowCount={driverInfo?.booking?.length} />
                <TableBody>
                  {driverInfo?.booking?.map((row) => {
                    const { id, kid, distance, fee, startTime, endTime, status } = row;
                    console.log(row);
                    return (
                      <TableRow hover key={id} tabIndex={-1} role="checkbox">
                        <TableCell> </TableCell>

                        <TableCell align="center">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            {kid && <Avatar alt={kid?.name} src={kid?.avatar} />}
                            <Typography variant="subtitle2" noWrap>
                              {kid?.name}
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
        </Stack>
      </Container>
    </>
  );
};

export default DriverDetailPage;
