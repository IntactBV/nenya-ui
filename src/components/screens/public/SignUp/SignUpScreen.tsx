'use client';

import Link from 'next/link';
import {
  Paper,
  TextInput,
  PasswordInput,
  Button,
  Title,
  Text,
  Alert,
} from '@mantine/core';
import { useForm } from '@mantine/form';

import { useCallback, useMemo, useState } from 'react';
import { isEmpty } from 'lodash';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/src/domain/contexts/AuthProvider';
import { TAccountBase } from '@/src/domain/types';
import classes from './SignUp.module.css';

export function SignUpScreen() {
  const [ error, setError ] = useState<string>( '' );
  const [ isLoading, setIsLoading ] = useState<boolean>( false );
  const router = useRouter();
  const form = useForm<TAccountBase>({
    initialValues: {
      email: '',
      password: '',
      confirm: '',
    },
  });
  const { signup } = useAuth();
  // const isButtonEnabled = useMemo( () => {
  //   if ( !isEmpty( error ) ) {
  //     return false;
  //   }
  // }, [ error ] );

  const handleFormSubmit = useCallback( async( acc: TAccountBase ) => {
    if ( acc.password !== acc.confirm ) {
      return setError( 'Parolele nu corespund' );
    }

    try {
      setError( '' );
      setIsLoading( true );
      await signup( acc.email, acc.password );
      router.push( '/crm/dashboard', { scroll: false });
    } catch ( e: any ) {
      setError( e.code );
    }

    setIsLoading( false );
  }, [ signup ]);

  return (
    <form onSubmit={form.onSubmit( handleFormSubmit )} className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30} pt={80}>
        <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
            Creare cont Nenya Digital
        </Title>

        {( !isEmpty( error )) && (
          <Alert variant="outline" color="red" title="Nu s-a putut genera contul solicitat" mb="md">
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
        <PasswordInput
          label="Confirmare parola:"
          placeholder="Parola ta"
          mb="md"
          size="md"
          {...form.getInputProps( 'confirm' )}
          onBlur={( e: any ) => {
            form.setValues({
              confirm: e.target.value,
            });
          }}
        />

        <Button type="submit" fullWidth mt="xl" size="md" disabled={isLoading}>
            Inregistrare
        </Button>

        <Text ta="center" mt="md">
            Ai deja cont?{' '}
          <Link href="/public/login">
              Autentifică-te!
          </Link>
        </Text>
      </Paper>
    </form>
  );
}
