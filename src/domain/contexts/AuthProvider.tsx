'use client';

import React, { FC, PropsWithChildren, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { auth } from '@/src/domain/firebase';

const AuthContext = React.createContext<any>({});

export const useAuth = () => useContext( AuthContext );

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [ currentUser, setCurrentUser ] = useState<User>();
  const [ isLoading, setLoading ] = useState<boolean>( true );
  const signup = ( email: string, pass: string ) =>
    createUserWithEmailAndPassword( auth, email, pass );
  const login = ( email: string, pass: string ) => signInWithEmailAndPassword( auth, email, pass );
  const logout = () => signOut( auth );

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(( user: any ) => {
      setLoading( false );
      setCurrentUser( user );
    });

    return unsubscribe;
  }, []);

  const value = useMemo(() => ({
    currentUser,
    signup,
    login,
    logout,
  }), [ currentUser ]);

  return (
    <AuthContext.Provider value={value}>
      {isLoading && (
        <span>...</span>
      )}

      {!isLoading && children}
    </AuthContext.Provider>
  );
};
