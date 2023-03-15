import { Avatar, Card, CardContent, CardHeader, Container, Stack, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, useNavigate } from 'react-router-dom';
import userAPI from '../API/users';

const UserDetailPage = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({});

  const getUserInfo = useCallback(async () => {
    const response = await userAPI.getUserById(id);
    setUserInfo(response.data.data);
  }, [id]);

  useEffect(() => {
    getUserInfo();
  }, [getUserInfo, id]);

  return (
    <>
      <Helmet>
        <title> {(userInfo && userInfo?.name) || ''} | Pikid </title>
      </Helmet>

      <Container>
        <Stack direction="row" spacing={5} alignItems="center" mb={5}>
          <Avatar alt={userInfo.name} src={userInfo.avatar} sx={{ width: 150, height: 150 }} />
          <Typography variant="h3" gutterBottom>
            {userInfo.name}
          </Typography>
        </Stack>

        <Stack direction="row" spacing={5} alignItems="center" mb={5}>
          <Typography variant="h3" gutterBottom>
            Children
          </Typography>
        </Stack>
        <Stack direction={'row'} spacing={5}>
          {userInfo.kid?.map((ele) => {
            const { id, name, gender, age } = ele;
            return (
              <Card
                key={id}
                sx={{ maxWidth: 345 }}
                onClick={() => {
                  navigate(`/dashboard/kid/${id}`);
                }}
              >
                <CardHeader
                  avatar={<Avatar src={userInfo?.avatar} alt={userInfo?.name} sx={{ width: 50, height: 50 }} />}
                  title={name}
                />

                <CardContent>
                  <Stack direction={'row'} alignItems="center" spacing={2}>
                    <Typography variant="h5" align="justify">
                      Gender:
                    </Typography>
                    <Typography variant="body1" align="justify">
                      {gender}
                    </Typography>
                  </Stack>

                  <Stack direction={'row'} alignItems="center" spacing={2}>
                    <Typography variant="h5" align="justify">
                      Age:
                    </Typography>
                    <Typography variant="body1" align="justify">
                      {age}
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            );
          })}
        </Stack>
      </Container>
    </>
  );
};

export default UserDetailPage;
