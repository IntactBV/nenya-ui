'use client';

import { Button, Card, Stack, Title } from '@mantine/core';
import { useAuth } from '@uiDomain/contexts/AuthProvider';
import app, { auth } from '@uiDomain/firebase';
import { useSetUserTenantMutation } from '@uiRepos/users.repo';

type TUserCardProps = {
  user: any;
};

export const UserCard: FC<TUserCardProps> = ({
  user,
}) => {
  const [ performAssingTenant ] = useSetUserTenantMutation();

  const { currentUser } = useAuth();

  return (
    <Card>
      <Stack>
        <Title order={4}>{user.email}</Title>
        <Button onClick={() => {
          // currentUser.updateProfile({
          //   displayName: 'Test',
          // }).then(( response: any ) => {
          //   //Success
          //   console.log( response );
          // }, ( error: any ) => {
          //   //Error
          //   console.log( error );
          // });

          performAssingTenant({
            uid: user.uid,
            tenantId: '3e439136-f6c2-4e88-83e7-a592b8ae9db7',
          });
        }}>Assign tenant Alpha
        </Button>
      </Stack>
    </Card>
  );
};
