'use client';

import { useCallback, useState } from 'react';
import {
  Paper,
  TextInput,
  PasswordInput,
  Checkbox,
  Button,
  Title,
  Text,
  Alert,
  Loader,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import Link from 'next/link';
import { isEmpty } from 'lodash';
import { useRouter } from 'next/navigation';
import { accountLoginUser, setAccount, setAccountTenants } from '@uiStore/features/account/account.slice';
import { useAppDispatch } from '@uiStore/hooks';
import { EAccountRoles, IUserImpl } from '@uiStore/features/account/account.types';
import { useTranslation } from 'react-i18next';
import { useLazyGetUserDetailsQuery } from '@uiRepos/users.repo';
import { TAccountBase } from '@/src/domain/types';
import { useAuth } from '@/src/domain/contexts/AuthProvider';
import classes from './LogIn.module.css';

export function LogInScreen() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { login } = useAuth();
  const [ error, setError ] = useState<string>( '' );
  const [ isLoading, setIsLoading ] = useState<boolean>( false );
  const router = useRouter();
  const [ requestUserDetails ] = useLazyGetUserDetailsQuery();

  const form = useForm<TAccountBase>({
    initialValues: {
      email: '',
      password: '',
    },
  });

  const handleFormSubmit = useCallback( async( acc: TAccountBase ) => {
    try {
      setError( '' );
      setIsLoading( true );
      const loginResult = await login( acc.email, acc.password );
      const userResult = await requestUserDetails( loginResult?.user?.uid );
      const userDetails = userResult?.data;
      const userTenant = isEmpty( userDetails?.tenantAccounts )
        ? []
        : userDetails?.tenantAccounts[ 0 ];

      const loggedInUser = loginResult?.user;
      const user: IUserImpl = {
        email: loggedInUser?.email,
        displayName: loggedInUser?.displayName,
        photoURL: loggedInUser?.photoURL,
        phoneNumber: loggedInUser?.phoneNumber,
        providerId: loggedInUser?.providerId,
        tenant: userTenant.tenantSlug,
        tenantId: userTenant.tenantId,
        tenantName: userTenant.tenantName,
        tenantSlug: userTenant.tenantSlug,
        role: userTenant.role as EAccountRoles,
        uid: loggedInUser?.uid,
      };
      await dispatch( setAccountTenants( userDetails?.tenantAccounts ));
      await dispatch( accountLoginUser({
        user,
        tenant: userDetails?.tenantAccounts[ 0 ] || {},
      }));
      router.push( '/crm/dashboard' );
    } catch ( e: any ) {
      setError( e.code );
    }

    setIsLoading( false );
  }, []);

  return (
    <div className={classes.wrapper}>
      <form onSubmit={form.onSubmit( handleFormSubmit )}>
        <Paper className={classes.form} radius={0} p={30} pt={80}>
          <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
            {t( 'login' )}
          </Title>

          {( !isEmpty( error )) && (
            <Alert variant="outline" color="red" title="Procesul de autentificare a esuat" mb="md">
              {error}
            </Alert>
          )}

          <TextInput
            mb="md"
            size="md"
            label="Adresa email:"
            placeholder="hello@gmail.com"
            {...form.getInputProps( 'email' )}
            onBlur={( e: any ) => {
              form.setValues({
                email: e.target.value,
              });
            }}
          />

          <PasswordInput
            label="Parola:"
            placeholder="Parola ta"
            mb="md"
            size="md"
            {...form.getInputProps( 'password' )}
            onBlur={( e: any ) => {
              form.setValues({
                password: e.target.value,
              });
            }}
          />

          {/* <Checkbox label="Pastrează-mă logat" mt="xl" size="md" /> */}

          <Button type="submit" fullWidth mt="xl" size="md" disabled={isLoading}>
            {t( 'login' )} &nbsp;
            {isLoading && <Loader size="xs" />}
          </Button>

          {/* <Text ta="center" mt="md">
            Nu ai cont?{' '}
            <Link href="/public/signup">
              Inregistrează-te!
            </Link>
          </Text> */}
        </Paper>
      </form>
    </div>
  );
}
