import { configureStore } from '@reduxjs/toolkit';
import { attributesRepo } from '@uiRepos/attributes.repo';
import { entitiesRepo } from '@uiRepos/entities.repo';
import { modulesRepo } from '@uiRepos/modules.repo';
import { tenantsRepo } from '@uiRepos/tenants.repo';
import { recordsRepo } from '@uiRepos/records.repo';
import account from './features/account';
import common from './features/common';

export const store = configureStore({
  reducer: {
    common,
    account,

    [ attributesRepo.reducerPath ]: attributesRepo.reducer,
    [ entitiesRepo.reducerPath ]: entitiesRepo.reducer,
    [ modulesRepo.reducerPath ]: modulesRepo.reducer,
    [ tenantsRepo.reducerPath ]: tenantsRepo.reducer,
    [ recordsRepo.reducerPath ]: recordsRepo.reducer,

  },
  middleware: ( getDefaultMiddleware: any ) => getDefaultMiddleware().concat(
    attributesRepo.middleware,
    entitiesRepo.middleware,
    modulesRepo.middleware,
    tenantsRepo.middleware,
    recordsRepo.middleware,
  ),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
