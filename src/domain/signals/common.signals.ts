import { signal } from '@preact/signals-react';
import { LOCAL_STORAGE } from '@uiDomain/domain.constants';
import { EAccountRoles } from '@/src/domain/types';

export const $userData = signal<{ role: EAccountRoles }>({
  role: EAccountRoles.ADMIN,
});

export const $isDarkMode = signal<boolean>(
  typeof window === 'undefined'
    ? false
    : window.localStorage.getItem( LOCAL_STORAGE.MANTINE_COLOR_SCHEME ) === 'dark'
);

export const $focusedEntityId = signal<string>( '' );

// effect(() => {
//   localStorage.setItem( LOCAL_STORAGE.DARK_MODE, $isDarkMode.value?.toString());
// });
