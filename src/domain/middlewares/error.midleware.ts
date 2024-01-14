import { isRejectedWithValue } from '@reduxjs/toolkit';
import type { MiddlewareAPI, Middleware } from '@reduxjs/toolkit';
import { accountLogout } from '@uiStore/features/account/account.slice';

/**
 * Log a warning and show a toast!
 */
export const rtkQueryErrorLogger: Middleware = ( api: MiddlewareAPI ) => ( next ) => ( action ) => {
  if ( isRejectedWithValue( action )) {
    console.warn( 'We got a rejected action!', action );
    if ( action.payload?.status === 403 ) {
      console.warn( 'We got a 403!' );
      // router.push('/login'); // Replace '/login' with the actual login page URL

      api.dispatch( accountLogout());
    }
  }

  return next( action );
};
