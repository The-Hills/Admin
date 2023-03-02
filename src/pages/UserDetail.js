import { Container, Stack, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import userAPI from '../API/users';

const UserDetail = () => {
  const { id } = useParams();

  const [userInfo, setUserInfo] = useState({});

  const getUserInfo = useCallback(async () => {
    const response = await userAPI.getUserId(id);
    setUserInfo(response.data.data);
  }, [id]);

  useEffect(() => {
    getUserInfo();
  }, [getUserInfo, id]);

  console.log(userInfo);

  return (
    <>
      <Helmet>
        <title> User {(userInfo && userInfo?.name) || ''} | Pikid </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            {userInfo.name}
          </Typography>
        </Stack>
      </Container>
    </>
  );
};

export default UserDetail;
