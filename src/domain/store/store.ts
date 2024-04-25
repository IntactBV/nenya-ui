import { configureStore } from '@reduxjs/toolkit';
import { attributesRepo } from '@uiRepos/attributes.repo';
import { entitiesRepo } from '@uiRepos/entities.repo';
import { modulesRepo } from '@uiRepos/modules.repo';
import { tenantsRepo } from '@uiRepos/tenants.repo';
import { usersRepo } from '@uiRepos/users.repo';
import { recordsRepo } from '@uiRepos/records.repo';
import { rtkQueryErrorLogger } from '@uiDomain/middlewares/error.midleware';
import { realmsRepo } from '@uiRepos/realms.repo';
import { tagsRepo } from '@uiRepos/tags.repo';
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
    [ usersRepo.reducerPath ]: usersRepo.reducer,
    [ realmsRepo.reducerPath ]: realmsRepo.reducer,
    [ tagsRepo.reducerPath ]: tagsRepo.reducer,

  },
  middleware: ( getDefaultMiddleware: any ) => getDefaultMiddleware().concat(
    attributesRepo.middleware,
    entitiesRepo.middleware,
    modulesRepo.middleware,
    tenantsRepo.middleware,
    recordsRepo.middleware,
    usersRepo.middleware,
    realmsRepo.middleware,
    tagsRepo.middleware,
    rtkQueryErrorLogger
  ),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
